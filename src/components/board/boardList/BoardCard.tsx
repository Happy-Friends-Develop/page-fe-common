import React, { useState } from 'react';
import type { BoardResponse } from '../../../api/user/userApi';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || '';

interface BoardCardProps {
  board: BoardResponse;
}

// 게시글 카드
const BoardCard = ({ board }: { board: BoardResponse }) => {
  // 이미지 에러 상태 관리 (true면 회색 박스 보여줌)
  const [imgError, setImgError] = React.useState(false);
  
  const firstFile = board.files && board.files.length > 0 ? board.files[0] : null;
  
  // URL 조합 로직 (동영상은 /videos/, 이미지는 /images/)
  let thumbSrc = null;
  if (firstFile) {
    const folderPrefix = firstFile.fileType === 'VIDEO' ? '/videos/' : '/images/';
    // 썸네일이 있으면 썸네일, 없으면 원본 사용
    const filePath = firstFile.thumbnailPath || firstFile.filePath;
    thumbSrc = `${API_BASE_URL}${folderPrefix}${filePath}`;
  }

  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
        
        {/* 이미지가 있고, 에러가 안 났을 때만 이미지를 보여줌 */}
        {!imgError && thumbSrc ? (
          <img 
            src={thumbSrc} 
            alt={board.title} 
            className="w-100 h-100" 
            style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            // 이미지 로딩 실패 시 에러 상태를 true로 변경 -> 회색 박스가 렌더링됨
            onError={() => setImgError(true)}
          />
        ) : (
          // 이미지가 없거나 로딩 실패 시 보여줄 회색 박스
          <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-light text-muted">
             <div className="text-center">
                <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
                <p className="m-0 mt-1" style={{ fontSize: '12px' }}>이미지 없음</p>
             </div>
          </div>
        )}

      </div>
      
      <div className="card-body p-3">
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
  );
};

export default BoardCard;