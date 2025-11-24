import { atom } from 'nanostores';
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
  nickname: string;
  iat: number;
  exp: number;
}

export interface UserInfo {
  id: number;
  type: string;
  authorities: string[] | string;
  nickname?: string;
}

export const $accessToken = atom<string | null>(null);
export const $user = atom<UserInfo | null>(null);

const sanitizeToken = (token: string | null): string | null => {
  if (!token) return null;
  return token.replace(/[\s\uFEFF\xA0]+/g, '');
};

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
      authorities: authoritiesArray,
      nickname: decoded.nickname 
    });

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('auth-token', cleanToken);
    }

  } catch (error) {
    console.error('토큰 처리 실패:', error);
  }
};

export const logout = () => {
  $accessToken.set(null);
  $user.set(null);
  
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('auth-token');
  }
};

if (typeof window !== 'undefined') {
  const savedToken = localStorage.getItem('auth-token');
  if (savedToken) {
    setToken(savedToken);
  }
}