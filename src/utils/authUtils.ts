import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import type { TokenPayload, LoginRequest, UserInfo } from '../store/authStore';

// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  errorMessage: string | null;
  serverDateTime: string;
}

/**
 * 토큰 정리 함수
 */
export const sanitizeToken = (token: string | null): string | null => {
  if (!token) return null;
  if (token.trim() === '') { // trim() 추가로 공백만 있는 경우도 확실히 처리
    console.warn('토큰이 비어있습니다.');
    return null;
  }
  return token;
};

/**
 * JWT 토큰 디코딩 함수
 */
export const decodeToken = (token: string): TokenPayload | null => {
  const sanitizedToken = sanitizeToken(token);
  if (!sanitizedToken) return null;
  
  try {
    return jwtDecode<TokenPayload>(sanitizedToken);
  } catch (error) {
    console.error('토큰 디코딩 실패:', error);
    return null;
  }
};

/**
 * 토큰 만료 여부 확인
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

/**
 * 현재 저장된 토큰 유효성 검사
 */
export const validateAndCleanToken = (): boolean => {
  try {
    const { accessToken } = useAuthStore.getState();
    
    if (!accessToken) return false;
    
    const sanitizedToken = sanitizeToken(accessToken);
    if (!sanitizedToken) {
      console.warn('유효하지 않은 토큰이 감지되었습니다.');
      return false;
    }
    
    if (isTokenExpired(sanitizedToken)) {
      console.warn('만료된 토큰이 감지되었습니다.');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('토큰 검증 중 오류:', error);
    return false;
  }
};

/**
 * 사용자 인증 상태 확인
 */
export const isAuthenticated = (): boolean => {
  try {
    const { accessToken, isAuthenticated } = useAuthStore.getState();
    
    if (!accessToken || !isAuthenticated) {
      return false;
    }
    
    return validateAndCleanToken();
  } catch (error) {
    console.error('인증 상태 확인 중 오류:', error);
    return false;
  }
};

/**
 * 인증 헤더 생성 (Bearer 토큰)
 */
export const getAuthHeader = (): { Authorization: string } | Record<string, never> => {
  try {
    const { accessToken } = useAuthStore.getState();
    
    if (!accessToken) return {};
    
    // Bearer 접두사가 없는 경우 추가 (백엔드 요구사항에 따라 조정 가능)
    // 현재는 토큰 그대로 전송
    return { Authorization: `${accessToken}` };
  } catch (error) {
    console.error('인증 헤더 생성 중 오류:', error);
    return {};
  }
};

/**
 * 로그아웃 처리
 */
export const logout = (): void => {
  try {
    useAuthStore.getState().logout();
  } catch (error) {
    console.error('로그아웃 처리 중 오류:', error);
  }
};

/**
 * 로그인 처리
 */
export const login = async (credentials: LoginRequest): Promise<boolean> => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || '';
    
    const response = await axios.post<ApiResponse<string>>(
      `${apiBaseUrl}/api/auth`,
      credentials,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
    const result = response.data;
    
    if (!result.success || !result.data) {
      console.error('로그인 실패:', result.errorMessage || '알 수 없는 오류');
      return false;
    }
    
    const token = result.data;
    
    if (!token) {
      console.error('서버에서 받은 토큰이 유효하지 않습니다.');
      return false;
    }
    
    // 스토어에 토큰 저장 (이 과정에서 decode 및 user 설정도 자동으로 됨)
    useAuthStore.getState().setToken(token);
    
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('로그인 API 에러:', error.response?.status, error.response?.data);
    } else {
      console.error('로그인 처리 중 예외 발생:', error);
    }
    return false;
  }
};

/**
 * 현재 사용자 정보 가져오기
 */
export const getUserInfo = (): UserInfo | null => {
  try {
    const { user, accessToken } = useAuthStore.getState();
    
    // 1. 스토어에 이미 사용자 정보가 있으면 반환
    if (user) return user;
    
    // 2. 없으면 토큰에서 새로 추출 시도
    if (!accessToken) return null;
    
    const decoded = decodeToken(accessToken);
    if (!decoded) return null;
    
    // authorities 처리 (문자열 -> 배열)
    const authoritiesArray = typeof decoded.authorities === 'string' 
      ? decoded.authorities.split(',') 
      : decoded.authorities || [];

    // 사용자 정보 재구성
    const userInfo: UserInfo = {
      id: decoded.id,
      type: decoded.type,
      authorities: authoritiesArray
      // organizationId, kioskGroupId 제거됨
    };
    
    // 스토어 업데이트 (싱크 맞추기)
    useAuthStore.getState().setUser(userInfo);
    
    return userInfo;
  } catch (error) {
    console.error('사용자 정보 조회 중 오류:', error);
    return null;
  }
};

/**
 * 사용자 권한 확인
 */
export const hasRole = (role: string): boolean => {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.authorities) return false;
  
  if (Array.isArray(userInfo.authorities)) {
    return userInfo.authorities.includes(role);
  }
  
  if (typeof userInfo.authorities === 'string') {
    // @ts-ignore: 타입 가드에도 불구하고 안전장치
    return userInfo.authorities.split(',').includes(role);
  }
  
  return false;
};

/**
 * 사용자 타입 확인
 */
export const hasUserType = (type: string): boolean => {
  const userInfo = getUserInfo();
  if (!userInfo || !userInfo.type) return false;
  
  return userInfo.type === type;
};