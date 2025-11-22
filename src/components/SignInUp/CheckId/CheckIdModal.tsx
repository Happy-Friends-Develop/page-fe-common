import React from 'react';
import { useCheckId } from './useCheckId';
import type { CheckIdModalProps } from './types';

const CheckIdModal = ({ onClose, onComplete }: CheckIdModalProps) => {
  const { 
    tempId, 
    isChecked, 
    handleChange, 
    handleCheck, 
    handleUse 
  } = useCheckId({ onComplete });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content-custom" 
        style={{ height: 'auto', padding: '20px' }} 
        onClick={e => e.stopPropagation()}
      >
        
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h4 style={{ margin: 0, fontWeight: 'bold' }}>아이디 중복확인</h4>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
            사용하고자 하는 아이디를 입력해주세요.
          </p>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input 
              type="text" 
              className="form-control custom-input" 
              value={tempId} 
              onChange={handleChange}
              placeholder="아이디 입력"
              style={{ flex: 1 }}
            />
            <button 
              className="btn btn-outline-brand" 
              onClick={handleCheck}
              style={{ whiteSpace: 'nowrap' }}
            >
              중복확인
            </button>
          </div>

          <button 
            className="btn btn-brand w-100" 
            onClick={handleUse}
            disabled={!isChecked}
          >
            이 아이디 사용하기
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckIdModal;