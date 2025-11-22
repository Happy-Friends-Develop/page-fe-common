import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { userClient } from '../../api/index';
import type { UserRequest } from '../../api/user/userApi';
import { showSuccess, showError } from '../../utils/swal';
import CheckIdModal from './CheckId/CheckIdModal';
import './SignupForm.css';

const SignupForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIdComplete = (validId: string) => {
    setFormData(prev => ({ ...prev, id: validId }));
    setIsIdModalOpen(false); // 모달 닫기
  };

  const handleCompletePost = (data: any) => {
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

      const response = await userClient.api.register(finalData, { format: 'json' });
      
      if (response.ok) {
        await showSuccess('가입 완료', '회원가입이 완료되었습니다! 로그인 해주세요.');
        window.location.href = '/login';
      } else {
        const errorData = response.data as any;
        showError('가입 실패', errorData?.errorMessage || '회원가입에 실패했습니다.');
      }

    } catch (error) {
      console.error('Signup Error:', error);
      showError('오류', '서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      
      {isOpenPost && (
        <div className="modal-overlay" onClick={() => setIsOpenPost(false)}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
              <h5 className="m-0 fw-bold">주소 검색</h5>
              <button type="button" className="btn-close" onClick={() => setIsOpenPost(false)}></button>
            </div>
            <div style={{ flex: 1 }}>
               <DaumPostcode onComplete={handleCompletePost} style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      )}

      {/* 아이디 확인 모달 */}
      {isIdModalOpen && (
        <CheckIdModal 
          onClose={() => setIsIdModalOpen(false)} 
          onComplete={handleIdComplete} 
        />
      )}

      <div className="signup-card">
        <h3 className="signup-title">회원가입</h3>
        <p className="signup-subtitle">Happy Friends의 멤버가 되어보세요!</p>
        
        <form onSubmit={handleSignup}>
          
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input 
              type="text" 
              name="id" 
              className="form-control custom-input" 
              value={formData.id} 
              readOnly 
              onClick={() => setIsIdModalOpen(true)}
              placeholder="아이디 (클릭)" 
              required 
              style={{ cursor: 'pointer', backgroundColor: '#fff' }} 
            />
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input type="password" name="password" className="form-control custom-input" 
              value={formData.password} onChange={handleChange} placeholder="비밀번호를 입력하세요" required />
          </div>

          {/* 이름 & 닉네임 */}
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="form-label">이름</label>
              <input type="text" name="name" className="form-control custom-input" 
                value={formData.name} onChange={handleChange} placeholder="이름 입력" required />
            </div>
            <div className="col-md-6 form-group">
              <label className="form-label">닉네임</label>
              <input type="text" name="nickname" className="form-control custom-input" 
                value={formData.nickname} onChange={handleChange} placeholder="별명 입력" required />
            </div>
          </div>

          {/* 연락처 */}
          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input type="tel" name="phone" className="form-control custom-input" 
              value={formData.phone} onChange={handleChange} placeholder="010-0000-0000" required />
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input type="email" name="email" className="form-control custom-input" 
              value={formData.email} onChange={handleChange} placeholder="example@email.com" required />
          </div>

          {/* 생년월일 */}
          <div className="form-group">
            <label className="form-label">생년월일</label>
            <input type="date" name="birth" className="form-control custom-input" 
              value={formData.birth} onChange={handleChange} required />
          </div>

          {/* 주소 입력 */}
          <div className="form-group">
            <label className="form-label">주소</label>
            <input 
              type="text" 
              name="address" 
              className="form-control custom-input mb-2" 
              value={formData.address} 
              placeholder="주소를 검색해주세요 (클릭)" 
              readOnly 
              required 
              onClick={() => setIsOpenPost(true)}
              style={{ cursor: 'pointer' }} 
            />
            <input 
              type="text" 
              className="form-control custom-input" 
              placeholder="상세 주소를 입력하세요" 
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-brand w-100" disabled={isLoading}>
            {isLoading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                가입 처리 중...
              </span>
            ) : (
              '회원가입 완료'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;