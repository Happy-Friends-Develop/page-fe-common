import React from 'react';
import DaumPostcode from "react-daum-postcode";
import type { UserUpdateRequest } from '../../../api/user/userApi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  formData: UserUpdateRequest;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  // 주소 검색 관련
  isPostOpen: boolean;
  setPostOpen: (isOpen: boolean) => void;
  onAddressComplete: (data: any) => void;
}

const EditUserModal = ({ 
  isOpen, onClose, formData, onChange, onSubmit, 
  isPostOpen, setPostOpen, onAddressComplete 
}: Props) => {
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* 주소 검색 모달 (중첩) */}
        {isPostOpen && (
          <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={() => setPostOpen(false)}>
            <div style={{ width: "400px", height: "500px", background: "white" }}>
              <DaumPostcode onComplete={onAddressComplete} style={{ height: "100%" }} />
            </div>
          </div>
        )}

        <div className="modal-header">
          <h3>내 정보 수정</h3>
          <button className="btn-close-custom" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={onSubmit}>
          <EditInput label="이름" name="name" value={formData.name} onChange={onChange} required />
          <EditInput label="닉네임" name="nickname" value={formData.nickname} onChange={onChange} required />
          <EditInput label="전화번호" name="phone" value={formData.phone} onChange={onChange} required />
          <EditInput label="이메일" name="email" value={formData.email} onChange={onChange} required />

          <div className="edit-form-group">
            <label className="edit-label">주소 (클릭하여 검색)</label>
            <input
              type="text"
              name="address"
              className="edit-input"
              value={formData.address}
              readOnly
              onClick={() => setPostOpen(true)}
              placeholder="주소를 검색하려면 클릭하세요"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>취소</button>
            <button type="submit" className="btn-save">저장하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 반복되는 인풋 줄이기용 컴포넌트
const EditInput = ({ label, name, value, onChange, required }: any) => (
  <div className="edit-form-group">
    <label className="edit-label">{label}</label>
    <input type="text" name={name} className="edit-input" value={value} onChange={onChange} required={required} />
  </div>
);

export default EditUserModal;