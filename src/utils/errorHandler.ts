import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../store/authStore'; 

// 에러 타입 (Enum)
export enum ErrorType {
  NETWORK = 'NETWORK',
  SERVER = 'SERVER',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID'
}

// 에러 응답 인터페이스
export interface ApiErrorResponse {
  errorMessage?: string;
  message?: string;
  errorCode?: string | number;
  errors?: Record<string, string[]>;
  [key: string]: any;
}

// 앱 내부 에러 인터페이스
export interface AppError {
  type: ErrorType;
  message: string;
  code?: string | number;
  originalError?: any;
  data?: any;
}

export class ErrorHandler {
  // Axios 에러 변환
  static handleAxiosError(error: AxiosError<ApiErrorResponse>): AppError {
    if (error.code === 'ECONNABORTED') {
      return {
        type: ErrorType.TIMEOUT,
        message: '요청 시간이 초과되었습니다.',
        code: error.code,
        originalError: error
      };
    }

    if (!error.response) {
      return {
        type: ErrorType.NETWORK,
        message: '서버와 연결할 수 없습니다. 인터넷 상태를 확인해주세요.',
        code: error.code,
        originalError: error
      };
    }

    const { status, data } = error.response;
    let errorMessage = data?.errorMessage || data?.message || '알 수 없는 오류가 발생했습니다.';
    let errorType = ErrorType.UNKNOWN;

    const isTokenError = errorMessage.includes('JWT') || errorMessage.includes('token');

    switch (status) {
      case 400:
        errorType = ErrorType.VALIDATION;
        if (isTokenError) {
            errorType = ErrorType.TOKEN_INVALID;
            errorMessage = '로그인 정보가 유효하지 않습니다.';
            logout();
        }
        break;
      case 401:
        errorType = ErrorType.TOKEN_EXPIRED;
        errorMessage = '인증이 만료되었습니다. 다시 로그인해주세요.';
        logout(); 
        break;
      case 403:
        errorType = ErrorType.AUTHORIZATION;
        errorMessage = '접근 권한이 없습니다.';
        break;
      case 404:
        errorType = ErrorType.NOT_FOUND;
        errorMessage = '요청하신 정보를 찾을 수 없습니다.';
        break;
      case 500:
      case 502:
      case 503:
        errorType = ErrorType.SERVER;
        errorMessage = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
        break;
      default:
        errorType = ErrorType.UNKNOWN;
    }

    return {
      type: errorType,
      message: errorMessage,
      code: status,
      originalError: error,
      data
    };
  }

  // 에러 메시지 표시 (Toast) - 그대로 유지
  static showErrorMessage(error: AppError): void {
    if (!toast.isActive(String(error.code))) {
        toast.error(error.message, {
            toastId: String(error.code),
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
  }

  // 메인 처리 함수 - 그대로 유지
  static handleError(error: any): AppError {
    let appError: AppError;

    if (axios.isAxiosError(error)) {
      appError = this.handleAxiosError(error);
    } else {
      appError = {
        type: ErrorType.UNKNOWN,
        message: error.message || '알 수 없는 오류가 발생했습니다.',
        originalError: error
      };
    }

    console.error(`[${appError.type}] ${appError.message}`, appError);
    this.showErrorMessage(appError);

    return appError;
  }
}