import { atom, map } from 'nanostores';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
  loginId: string;
  pwd: string;
}

export interface TokenPayload {
  sub: string;
  id: number;
  type: string;
  authorities: string;
  iat: number;
  exp: number;
}

export interface UserInfo {
  id: number;
  type: string;
  authorities: string[] | string;
}

// 토큰: 문자열 저장소 (초기값: 빈 문자열)
export const $accessToken = atom<string | null>(null);

// 사용자 정보: 객체 저장소 (초기값: null)
export const $user = atom<UserInfo | null>(null);

// 토큰 정리 함수 (내부용)
const sanitizeToken = (token: string | null): string | null => {
  if (!token) return null;
  return token.replace(/[\s\uFEFF\xA0]+/g, '');
};

/**
 * 토큰 설정 및 로그인 처리 함수
 */
export const setToken = (token: string) => {
  const cleanToken = sanitizeToken(token);
  if (!cleanToken) return;

  try {
    const decoded = jwtDecode<TokenPayload>(cleanToken);
    
    // 토큰 저장
    $accessToken.set(cleanToken);

    // 사용자 정보 저장
    const authoritiesArray = decoded.authorities ? decoded.authorities.split(',') : [];
    $user.set({
      id: decoded.id,
      type: decoded.type,
      authorities: authoritiesArray
    });

    //로컬 스토리지 저장
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth-token', cleanToken);
    }

  } catch (error) {
    console.error('토큰 처리 실패:', error);
  }
};

/**
 * 로그아웃 함수
 */
export const logout = () => {
  $accessToken.set(null);
  $user.set(null);
  
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('auth-token');
  }
};

// 초기화
if (typeof window !== 'undefined') {
  const savedToken = localStorage.getItem('auth-token');
  if (savedToken) {
    setToken(savedToken); // 저장된 토큰이 있으면 상태 복구
  }
}