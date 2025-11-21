import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

// API 응답 타입 정의
export interface ApiResponse {
  success: boolean;
  data: string; // JWT 토큰 문자열
  errorMessage: string | null;
  serverDateTime: string;
}

// 로그인 요청 인터페이스
export interface LoginRequest {
  loginId: string;
  pwd: string;
}

// JWT 토큰 Payload 
export interface TokenPayload {
  sub: string;            // "happy-friends token"
  id: number;             // 사용자 ID
  type: string;           // 로그인 타입
  authorities: string;    // 권한 문자열 (예: "ROLE_ADMIN")
  iat: number;            // 발급 시간
  exp: number;            // 만료 시간
}

// 사용자 정보 인터페이스
export interface UserInfo {
  id: number;
  type: string;
  authorities: string[] | string;
}

interface AuthState {
  accessToken: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  
  // 액션
  setToken: (token: string) => void;
  setUser: (user: UserInfo) => void;
  updateAccessToken: (newToken: string) => void;
  logout: () => void;
  decodeToken: (token: string) => TokenPayload | null;
  
  debug: () => void;
}

// 토큰 정리 함수
const sanitizeToken = (token: string | null): string | null => {
  if (!token) return null;
  const sanitizedToken = token.replace(/[\s\uFEFF\xA0]+/g, '');
  if (!sanitizedToken) {
    console.warn('토큰이 비어있습니다.');
    return null;
  }
  return sanitizedToken;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      decodeToken: (token: string) => {
        try {
          const cleanToken = sanitizeToken(token);
          if (!cleanToken) return null;
          
          return jwtDecode<TokenPayload>(cleanToken);
        } catch (error) {
          console.error('토큰 디코딩 실패:', error);
          return null;
        }
      },

      setToken: (token: string) => {
        const cleanToken = sanitizeToken(token);
        if (!cleanToken) return;
        
        const decoded = get().decodeToken(cleanToken);
        if (decoded) {
          // authorities 문자열을 배열로 변환
          const authoritiesArray = decoded.authorities ? 
            decoded.authorities.split(',') : [];
          
          set({
            accessToken: cleanToken,
            user: {
              id: decoded.id,
              type: decoded.type,
              authorities: authoritiesArray
            },
            isAuthenticated: true
          });
          
          try {
            localStorage.setItem('auth-token', cleanToken);
          } catch (err) {
            console.error('토큰 저장 실패:', err);
          }
        }
      },

      setUser: (user) => set({ user }),

      updateAccessToken: (newToken) => {
        const cleanToken = sanitizeToken(newToken);
        if (!cleanToken) return;
        
        const decoded = get().decodeToken(cleanToken);
        if (decoded) {
          const authoritiesArray = decoded.authorities ? 
            decoded.authorities.split(',') : [];
            
          set({
            accessToken: cleanToken,
            user: {
              id: decoded.id,
              type: decoded.type,
              authorities: authoritiesArray
            }
          });
          
          try {
            localStorage.setItem('auth-token', cleanToken);
          } catch (err) {
            console.error('토큰 저장 실패:', err);
          }
        }
      },

      logout: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false
        });
        try {
          localStorage.removeItem('auth-token');
        } catch (err) {
          console.error('토큰 제거 실패:', err);
        }
      },
      
      debug: () => {
        const state = get();
        console.log('User:', state.user);
        console.log('Token:', state.accessToken);
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        if (state && !state.accessToken) {
           // 백업 토큰 복구 로직
           try {
             const backupToken = localStorage.getItem('auth-token');
             if (backupToken) state.setToken(backupToken);
           } catch (e) {}
        }
      }
    }
  )
);

// Astro(SSR) 환경 대비 안전한 초기화
if (typeof window !== 'undefined') {
  (() => {
    try {
      const { accessToken, setToken } = useAuthStore.getState();
      if (!accessToken) {
        const backupToken = localStorage.getItem('auth-token');
        if (backupToken) setToken(backupToken);
      }
    } catch (err) {
      console.error('초기화 실패:', err);
    }
  })();
}