import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  $accessToken,
  $user,
  setToken,
  logout as storeLogout,
} from "../store/authStore";
import type { TokenPayload, LoginRequest, UserInfo } from "../store/authStore";

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
  if (token.trim() === "") {
    console.warn("토큰이 비어있습니다.");
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
    console.error("토큰 디코딩 실패:", error);
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
    const accessToken = $accessToken.get();

    if (!accessToken) return false;

    const sanitizedToken = sanitizeToken(accessToken);
    if (!sanitizedToken) {
      console.warn("유효하지 않은 토큰이 감지되었습니다.");
      return false;
    }

    if (isTokenExpired(sanitizedToken)) {
      console.warn("만료된 토큰이 감지되었습니다.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("토큰 검증 중 오류:", error);
    return false;
  }
};

/**
 * 사용자 인증 상태 확인
 */
export const isAuthenticated = (): boolean => {
  try {
    const accessToken = $accessToken.get();

    if (!accessToken) {
      return false;
    }

    return validateAndCleanToken();
  } catch (error) {
    console.error("인증 상태 확인 중 오류:", error);
    return false;
  }
};

/**
 * 인증 헤더 생성 (Bearer 토큰)
 */
export const getAuthHeader = ():
  | { Authorization: string }
  | Record<string, never> => {
  try {
    const accessToken = $accessToken.get();

    if (!accessToken) return {};

    return { Authorization: `${accessToken}` };
  } catch (error) {
    console.error("인증 헤더 생성 중 오류:", error);
    return {};
  }
};

/**
 * 로그아웃 처리
 */
export const logout = (): void => {
  try {
    storeLogout();
  } catch (error) {
    console.error("로그아웃 처리 중 오류:", error);
  }
};
// 기존처럼 export const logout을 쓰고 싶다면 import한 logout과 이름이 겹치므로
// import { logout as storeLogout } from ... 처럼 이름을 바꿔서 가져와야 합니다.
// 편의상 여기서는 위 함수를 그대로 쓰시되, 필요하면 이름을 맞추세요.

/**
 * 로그인 처리
 */
export const login = async (credentials: LoginRequest): Promise<boolean> => {
  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "";

    const response = await axios.post<ApiResponse<string>>(
      `${apiBaseUrl}/api/auth`,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = response.data;

    if (!result.success || !result.data) {
      console.error("로그인 실패:", result.errorMessage || "알 수 없는 오류");
      return false;
    }

    const token = result.data;

    if (!token) {
      console.error("서버에서 받은 토큰이 유효하지 않습니다.");
      return false;
    }

    setToken(token);

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "로그인 API 에러:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("로그인 처리 중 예외 발생:", error);
    }
    return false;
  }
};

/**
 * 현재 사용자 정보 가져오기
 */
export const getUserInfo = (): UserInfo | null => {
  try {
    let user = $user.get();
    const accessToken = $accessToken.get();

    if (user) return user;
    if (!accessToken) return null;

    const decoded = decodeToken(accessToken);
    if (!decoded) return null;

    const authoritiesArray =
      typeof decoded.authorities === "string"
        ? decoded.authorities.split(",")
        : decoded.authorities || [];

    const userInfo: UserInfo = {
      id: decoded.id,
      type: decoded.type,
      authorities: authoritiesArray,
      nickname: decoded.nickname, 
    };

    $user.set(userInfo);

    return userInfo;
  } catch (error) {
    console.error("사용자 정보 조회 중 오류:", error);
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

  // @ts-ignore: 타입 안전장치
  if (typeof userInfo.authorities === "string") {
    return (userInfo.authorities as string).split(",").includes(role);
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
