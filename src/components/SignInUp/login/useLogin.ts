import { useState } from 'react';
import { commonClient } from '../../../api/index'; // 경로 확인 필요
import { setToken } from '../../../store/authStore'; // 경로 확인 필요
import { showSuccess, showError } from '../../../utils/swal'; // 경로 확인 필요

export const useLogin = () => {
  // 상태 관리
  const [loginId, setLoginId] = useState('');
  const [pwd, setPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 입력 핸들러 (필요하다면 커스텀 가능하지만, 직접 set 함수 써도 무방)
  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value);
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => setPwd(e.target.value);

  // 로그인 처리 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 

    // 1. 유효성 검사
    if (!loginId || !pwd) {
      showError('입력 오류', '아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true); 

    try {
      // 2. API 호출
      const response = await commonClient.api.login({
        loginId: loginId,
        pwd: pwd,
      },
      { format : 'json' });

      const { success, data: token, errorMessage } = response.data;

      // 3. 성공 처리
      if (success && token) {
        setToken(token); 
        await showSuccess('환영합니다!', '성공적으로 로그인되었습니다.');
        window.location.href = '/'; 
      } else {
        // 4. 실패 처리 (백엔드 메시지)
        showError('로그인 실패', errorMessage || '아이디 또는 비밀번호를 확인해주세요.');
      }

    } catch (error) {
      console.error('Login Error:', error);
      showError('서버 오류', '서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false); 
    }
  };

  // 뷰(Component)에서 필요한 것만 내보내기
  return {
    formState: {
      loginId,
      pwd,
      isLoading
    },
    handlers: {
      handleChangeId,
      handleChangePwd,
      handleLogin
    }
  };
};