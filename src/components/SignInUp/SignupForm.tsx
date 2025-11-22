import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { userClient } from '../../api/index';
import type { UserRequest } from '../../api/user/userApi';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // 주소 찾기 모달창을 띄울지 말지 결정하는 상태
  const [isOpenPost, setIsOpenPost] = useState(false);

  // 상세 주소(동, 호수)는 따로 관리하다가 제출할 때 병합
  const [detailAddress, setDetailAddress] = useState('');

  const [formData, setFormData] = useState<UserRequest>({
    id: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    email: '',
    address: '', // API로 받은 기본 주소가 여기에 들어갑니다
    birth: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 주소 검색이 완료되었을 때 실행되는 함수
  const handleCompletePost = (data: any) => {
    let fullAddress = data.address; // 기본 주소
    let extraAddress = ''; 

    // 도로명 주소일 경우 참고항목(동, 건물명) 추가 로직
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    // 주소 상태 업데이트 및 창 닫기
    setFormData(prev => ({ ...prev, address: fullAddress }));
    setIsOpenPost(false);
  };

  // 모달 스타일 (화면 중앙에 띄우기)
  const postCodeStyle = {
    display: 'block',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    border: '1px solid #000',
    width: '400px',
    height: '500px',
    backgroundColor: 'white',
  };

  // 배경 스타일 (모달 뒤 어둡게)
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.values(formData).some(val => val === '') || detailAddress === '') {
      alert('상세 주소까지 모든 항목을 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      // 제출 전, "기본주소 + 상세주소"를 합쳐서 보냅니다
      const finalData = {
        ...formData,
        address: `${formData.address} ${detailAddress}`
      };

      const response = await userClient.api.register(finalData, { format: 'json' });
      
      if (response.ok) {
        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
        window.location.href = '/login';
      } else {
        const errorData = response.data as any;
        alert(errorData?.errorMessage || '회원가입에 실패했습니다.');
      }

    } catch (error) {
      console.error('Signup Error:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '600px' }}>
      
      {/* 주소 찾기 모달 (isOpenPost가 true일 때만 보임) */}
      {isOpenPost && (
        <>
          <div style={overlayStyle as any} onClick={() => setIsOpenPost(false)} />
          <div style={postCodeStyle as any}>
            <DaumPostcode onComplete={handleCompletePost} style={{ height: '100%' }} />
            <button 
              type="button" 
              className="btn btn-secondary btn-sm w-100 rounded-0" 
              onClick={() => setIsOpenPost(false)}
            >
              닫기
            </button>
          </div>
        </>
      )}

      <div className="card p-4 shadow border-0 rounded-3">
        <h3 className="text-center mb-4 fw-bold">회원가입</h3>
        
        <form onSubmit={handleSignup}>
          {/* 아이디 */}
          <div className="mb-3">
            <label className="form-label small text-muted">아이디</label>
            <input type="text" name="id" className="form-control" 
              value={formData.id} onChange={handleChange} placeholder="예: dev" required />
          </div>

          {/* 비밀번호 */}
          <div className="mb-3">
            <label className="form-label small text-muted">비밀번호</label>
            <input type="password" name="password" className="form-control" 
              value={formData.password} onChange={handleChange} placeholder="비밀번호 입력" required />
          </div>

          {/* 이름 & 닉네임 */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label small text-muted">이름</label>
              <input type="text" name="name" className="form-control" 
                value={formData.name} onChange={handleChange} placeholder="예: 홍길동" required />
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">닉네임</label>
              <input type="text" name="nickname" className="form-control" 
                value={formData.nickname} onChange={handleChange} placeholder="예: dev키드" required />
            </div>
          </div>

          {/* 연락처 & 이메일 */}
          <div className="mb-3">
            <label className="form-label small text-muted">전화번호</label>
            <input type="tel" name="phone" className="form-control" 
              value={formData.phone} onChange={handleChange} placeholder="010-0000-0000" required />
          </div>
          <div className="mb-3">
            <label className="form-label small text-muted">이메일</label>
            <input type="email" name="email" className="form-control" 
              value={formData.email} onChange={handleChange} placeholder="example@naver.com" required />
          </div>

          {/* 생년월일 */}
          <div className="mb-3">
            <label className="form-label small text-muted">생년월일</label>
            <input type="date" name="birth" className="form-control" 
              value={formData.birth} onChange={handleChange} required />
          </div>

          {/* 주소 입력 부분 */}
          <div className="mb-4">
            <label className="form-label small text-muted">주소</label>
            <div className="input-group mb-2">
              {/* 주소는 직접 입력 못하게 readOnly 처리 */}
              <input 
                type="text" 
                name="address" 
                className="form-control" 
                value={formData.address} 
                placeholder="주소 검색을 눌러주세요" 
                readOnly 
                required 
                onClick={() => setIsOpenPost(true)} // 인풋 클릭해도 검색창 뜨게
              />
              <button 
                className="btn btn-outline-primary" 
                type="button" 
                onClick={() => setIsOpenPost(true)}
              >
                주소 검색
              </button>
            </div>
            {/* 상세 주소는 사용자가 직접 입력 */}
            <input 
              type="text" 
              className="form-control" 
              placeholder="상세 주소 (예: 101동 102호)" 
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg fw-bold" disabled={isLoading}>
            {isLoading ? '가입 처리 중...' : '회원가입 완료'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;