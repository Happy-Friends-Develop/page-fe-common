import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useSignup } from './useSignup';
import CheckIdModal from '../checkId/CheckIdModal';
import './SignupForm.css';

const SignupForm = () => {
  // 훅에서 모든 로직 가져오기
  const { formState, modalState, handlers } = useSignup();
  
  const { formData, detailAddress, isLoading } = formState;
  const { isOpenPost, isIdModalOpen } = modalState;
  
  return (
    <div className="signup-container">
      
      {/* 주소 검색 모달 */}
      {isOpenPost && (
        <div className="modal-overlay" onClick={modalState.closePost}>
          <div className="modal-content-custom" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
              <h5 className="m-0 fw-bold">주소 검색</h5>
              <button type="button" className="btn-close" onClick={modalState.closePost}></button>
            </div>
            <div style={{ flex: 1 }}>
               <DaumPostcode onComplete={handlers.handleAddressComplete} style={{ height: '100%' }} />
            </div>
          </div>
        </div>
      )}

      {/* 아이디 확인 모달 */}
      {isIdModalOpen && (
        <CheckIdModal 
          onClose={modalState.closeIdModal} 
          onComplete={handlers.handleIdComplete} 
        />
      )}

      <div className="signup-card">
        <h3 className="signup-title">회원가입</h3>
        <p className="signup-subtitle">Happy Friends의 멤버가 되어보세요!</p>
        
        <form onSubmit={handlers.handleSignup}>
          
          {/* 아이디 */}
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input 
              type="text" 
              name="id" 
              className="form-control custom-input" 
              value={formData.id} 
              readOnly 
              onClick={modalState.openIdModal}
              placeholder="아이디 (클릭)" 
              required 
              style={{ cursor: 'pointer', backgroundColor: '#fff' }} 
            />
          </div>

          {/* 비밀번호 */}
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input type="password" name="password" className="form-control custom-input" 
              value={formData.password} onChange={handlers.handleChange} placeholder="비밀번호를 입력하세요" required />
          </div>

          {/* 이름 & 닉네임 */}
          <div className="row">
            <div className="col-md-6 form-group">
              <label className="form-label">이름</label>
              <input type="text" name="name" className="form-control custom-input" 
                value={formData.name} onChange={handlers.handleChange} placeholder="이름 입력" required />
            </div>
            <div className="col-md-6 form-group">
              <label className="form-label">닉네임</label>
              <input type="text" name="nickname" className="form-control custom-input" 
                value={formData.nickname} onChange={handlers.handleChange} placeholder="별명 입력" required />
            </div>
          </div>

          {/* 연락처 */}
          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input type="tel" name="phone" className="form-control custom-input" 
              value={formData.phone} onChange={handlers.handleChange} placeholder="010-0000-0000" required />
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input type="email" name="email" className="form-control custom-input" 
              value={formData.email} onChange={handlers.handleChange} placeholder="example@email.com" required />
          </div>

          {/* 생년월일 */}
          <div className="form-group">
            <label className="form-label">생년월일</label>
            <input type="date" name="birth" className="form-control custom-input" 
              value={formData.birth} onChange={handlers.handleChange} required />
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
              onClick={modalState.openPost}
              style={{ cursor: 'pointer' }} 
            />
            <input 
              type="text" 
              className="form-control custom-input" 
              placeholder="상세 주소를 입력하세요" 
              value={detailAddress}
              onChange={handlers.handleDetailAddressChange}
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