import { useState } from 'react';
import { userClient } from '../../../api/index';
import { showSuccess, showError } from '../../../utils/swal'; 
import type { CheckIdModalProps } from './types';

export const useCheckId = ({ onComplete }: Pick<CheckIdModalProps, 'onComplete'>) => {
  const [tempId, setTempId] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempId(e.target.value);
    // 글자가 바뀌면 다시 검사해야 하므로 false로 변경
    setIsChecked(false);
  };

  // 2. 중복확인 API 호출
  const handleCheck = async () => {
    if (!tempId) {
      showError('입력 오류', '아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await userClient.api.checkId(
        { loginId: tempId }, 
        { format: 'json' } 
      );
      
      // 백엔드 로직 유지: data가 false여야 "중복 아님(사용 가능)"
      if (response.data.success && response.data.data === false) {
        await showSuccess('사용 가능', '사용 가능한 아이디입니다.');
        setIsChecked(true);
      } else {
        const msg = response.data.errorMessage || '이미 사용 중인 아이디입니다.';
        showError('사용 불가', msg);
        setIsChecked(false);
      }
    } catch (error) {
      console.error(error);
      showError('오류', '중복 확인 중 문제가 발생했습니다. (서버 연결 확인)');
    }
  };

  // 사용하기 버튼 클릭
  const handleUse = () => {
    if (!isChecked) {
      showError('확인 필요', '중복 확인을 먼저 해주세요.');
      return;
    }
    onComplete(tempId);
  };

  return {
    tempId,
    isChecked,
    handleChange,
    handleCheck,
    handleUse
  };
};