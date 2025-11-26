import { Api as UserApi, type ApiConfig } from './user/userApi';
import { Api as AdminApi } from './admin/adminApi';
import { Api as CommonApi } from './common/commonApi';
import { $accessToken, logout } from '../store/authStore'; 
import { ErrorHandler } from '../utils/errorHandler';
import { showConfirm } from '../utils/swal'; 

// 공통 설정
const apiConfig: ApiConfig = {
  baseUrl: import.meta.env.PUBLIC_API_URL || '',

  securityWorker: (securityData) => {
    const accessToken = $accessToken.get();
    if (accessToken) {
      return {
        headers: {
          Authorization: `${accessToken}`, 
        },
      };
    }
  },

  customFetch: async (url, options) => {
    try {
      const response = await fetch(url, options);

      // 401(인증 만료) 발생 시
      if (response.status === 401) {
        logout(); // 일단 토큰은 지움
        
        if (typeof window !== 'undefined') {
          const isGoLogin = await showConfirm(
            '로그인이 필요해요', 
            '로그인 페이지로 이동할까요?',
            '네, 이동할래요'
          );

          // '네'를 눌렀을 때만 이동
          if (isGoLogin) {
            window.location.href = '/login';
          }
        }
      }

      return response;
    } catch (error) {
      console.error("API 요청 실패! 주소 :", url);
      console.error("에러 상세 : ", error);
      ErrorHandler.handleError(error);
      throw error;
    }
  },
};

export const userClient = new UserApi(apiConfig);
export const adminClient = new AdminApi(apiConfig);
export const commonClient = new CommonApi(apiConfig);