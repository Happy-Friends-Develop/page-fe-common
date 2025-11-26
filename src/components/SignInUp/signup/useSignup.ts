import { useState } from 'react';
import { userClient } from '../../../api/index'; 
import type { UserRequest } from '../../../api/user/userApi'; 
import { showSuccess, showError, handleApiError } from '../../../utils/swal'; 

export const useSignup = () => {
  // 1. 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPost, setIsOpenPost] = useState(false);      
  const [isIdModalOpen, setIsIdModalOpen] = useState(false); 
  const [detailAddress, setDetailAddress] = useState('');   

  const [formData, setFormData] = useState<UserRequest>({
    id: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '',
    birth: '',
  });

  // 2. 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  // 3. 아이디 중복확인 완료 핸들러
  const handleIdComplete = (validId: string) => {
    setFormData(prev => ({ ...prev, id: validId }));
    setIsIdModalOpen(false);
  };

  // 4. 주소 검색 완료 핸들러
  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address; 
    let extraAddress = ''; 
    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setFormData(prev => ({ ...prev, address: fullAddress }));
    setIsOpenPost(false);
  };

  // 5. 회원가입 전송 핸들러
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 빈 값 체크
    if (Object.values(formData).some(val => val === '') || detailAddress === '') {
      showError('입력 오류', '모든 항목을 빠짐없이 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const finalData = {
        ...formData,
        address: `${formData.address} ${detailAddress}`
      };

      // API 호출
      const response = await userClient.api.register(finalData, { format: 'json' });
      
      if (response.ok) {
        await showSuccess('가입 완료', '회원가입이 완료되었습니다! 로그인 해주세요.');
        window.location.href = '/login';
      } else {
        const errorData = response.data as any;
        showError('가입 실패', errorData?.errorMessage || '회원가입에 실패했습니다.');
      }

    } catch (error) {
      handleApiError(error, '오류', '회원가입 처리 중 문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState: {
      formData,
      detailAddress,
      isLoading,
    },
    modalState: {
      isOpenPost,
      openPost: () => setIsOpenPost(true),
      closePost: () => setIsOpenPost(false),
      isIdModalOpen,
      openIdModal: () => setIsIdModalOpen(true),
      closeIdModal: () => setIsIdModalOpen(false),
    },
    handlers: {
      handleChange,
      handleDetailAddressChange,
      handleIdComplete,
      handleAddressComplete,
      handleSignup,
    }
  };
};