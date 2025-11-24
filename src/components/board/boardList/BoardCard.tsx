import React, { useState } from 'react';
import type { BoardResponse } from '../../../api/user/userApi';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || '';

interface BoardCardProps {
  board: BoardResponse;
}

const BoardCard = ({ board }: BoardCardProps) => {
  // 이미지 에러 상태 관리
  const [imgError, setImgError] = useState(false);
  
  const firstFile = board.files && board.files.length > 0 ? board.files[0] : null;
  
  // URL 조합 로직
  let thumbSrc = null;
  if (firstFile) {
    const folderPrefix = firstFile.fileType === 'VIDEO' ? '/videos/' : '/images/';
    const filePath = firstFile.thumbnailPath || firstFile.filePath;
    thumbSrc = `${API_BASE_URL}${folderPrefix}${filePath}`;
  }

  return (
    <a href={`/board/${board.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
          
          {/* 이미지 표시 영역 */}
          {!imgError && thumbSrc ? (
            <img 
              src={thumbSrc} 
              alt={board.title} 
              className="w-100 h-100" 
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              onError={() => setImgError(true)}
            />
          ) : (
            // 이미지 없을 때 회색 박스
            <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-light text-muted">
               <div className="text-center">
                  <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
                  <p className="m-0 mt-1" style={{ fontSize: '12px' }}>이미지 없음</p>
               </div>
            </div>
          )}

        </div>
        
        <div className="card-body p-3">
          {/* 주소 배지 (추천 디자인 적용됨) */}
          <div className="mb-2">
            <span 
              className="d-inline-flex align-items-center px-2 py-1 border" 
              style={{ 
                backgroundColor: '#fff',      
                borderRadius: '20px',        
                color: '#666',              
                fontSize: '11px',             
                fontWeight: '600',          
                borderColor: '#eee'           
              }}
            >
              <i className="bi bi-geo-alt-fill text-danger me-1" style={{ fontSize: '10px' }}></i>
              {board.address ? board.address.split(' ')[0] : '전체'}
            </span>
          </div>
          
          <h5 className="card-title font-weight-bold text-truncate" style={{ fontSize: '16px' }}>
            {board.title}
          </h5>
          
          <p className="card-text text-muted text-truncate" style={{ fontSize: '13px' }}>
            {board.content}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3" style={{ fontSize: '12px', color: '#888' }}>
            <span>By <strong>{board.authorNickname}</strong></span>
            <div className="d-flex gap-2">
              <span><i className="bi bi-eye"></i> {board.view}</span>
              <span className="text-danger"><i className="bi bi-heart-fill"></i> {board.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default BoardCard;