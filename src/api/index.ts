import { Api as UserApi, type ApiConfig } from './user/userApi';
import { Api as AdminApi } from './admin/adminApi';
import { Api as CommonApi } from './common/commonApi';
import { useAuthStore } from '../store/authStore'; 
import { ErrorHandler } from '../utils/errorHandler';

// 공통 설정 (토큰 자동 주입 & 에러 처리)
const apiConfig: ApiConfig = {
  // 백엔드 주소 
  baseUrl: import.meta.env.PUBLIC_API_URL || 'http://localhost:8080',

  // 요청 보낼 때마다 토큰이 있으면 자동으로 헤더에 넣기
  securityWorker: (securityData) => {
    const { accessToken } = useAuthStore.getState();
    
    if (accessToken) {
      return {
        headers: {
          Authorization: `${accessToken}`, 
        },
      };
    }
  },

  // 요청 보내는 방식 커스텀 (에러 가로채기용)
  customFetch: async (url, options) => {
    try {
      const response = await fetch(url, options);

      // 401(인증 만료) 에러가 뜨면 바로 로그아웃 시키기
      if (response.status === 401) {
        useAuthStore.getState().logout();
        // 필요하다면 여기서 페이지 이동 로직 추가 (window.location.href = '/login')
      }

      return response;
    } catch (error) {
      // 네트워크 에러 등을 ErrorHandler로 넘기기
      ErrorHandler.handleError(error);
      throw error;
    }
  },
};

// 각 API 인스턴스 생성
export const userClient = new UserApi(apiConfig);
export const adminClient = new AdminApi(apiConfig);
export const commonClient = new CommonApi(apiConfig);