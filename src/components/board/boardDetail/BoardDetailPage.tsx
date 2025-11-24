import React from 'react';
import { useStore } from '@nanostores/react';
import { $user } from '../../../store/authStore';
import { userClient } from '../../../api/index';
import { useBoardDetail } from './useBoardDetail';
import CommentList from './CommentList';
import './BoardAllPage.css';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || '';

interface Props {
  boardId: string | undefined;
}

const BoardDetailPage = ({ boardId }: Props) => {
  const { board, isLoading } = useBoardDetail(boardId);
  const user = useStore($user);
  const isOwner = board && user?.nickname === board.authorNickname;

  // 게시글 삭제 핸들러
  const handleDelete = async () => {
    if (!boardId) return;
    if (!window.confirm("정말 이 게시글을 삭제하시겠습니까? 복구할 수 없습니다.")) return;

    try {
      const response = await userClient.api.deleteBoard(Number(boardId), { format: 'json' });
      
      if (response.data.success) {
        alert("게시글이 삭제되었습니다.");
        window.location.href = "/board"; // 삭제 후 목록으로 이동
      } else {
        alert(response.data.errorMessage || "삭제 실패");
      }
    } catch (error) {
      console.error("게시글 삭제 중 오류:", error);
      alert("오류가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    window.location.href = `/board/write?mode=edit&id=${boardId}`; 
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!board) {
    return <div className="text-center py-5">게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="board-page-container py-5">
      <div className="container">
        {/* 게시글 컨테이너 */}
        <div className="bg-white rounded-4 shadow-sm p-4 p-lg-5 mx-auto" style={{ maxWidth: '800px' }}>
          
          {/* 헤더 (제목, 작성자, 날짜) */}
          <div className="border-bottom pb-4 mb-4">
            <div className="d-flex justify-content-between align-items-start mb-3">
               <span className="badge bg-light text-secondary border px-3 py-2 rounded-pill">
                 <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                 {board.address || '위치 정보 없음'}
               </span>
               
               {/* 본인일 경우 수정/삭제 버튼 표시 */}
               {isOwner && (
                 <div className="d-flex gap-2">
                   <button 
                     onClick={handleEdit} 
                     className="btn btn-sm btn-outline-secondary"
                     style={{ fontSize: '0.8rem' }}
                   >
                     수정
                   </button>
                   <button 
                     onClick={handleDelete} 
                     className="btn btn-sm btn-outline-danger"
                     style={{ fontSize: '0.8rem' }}
                   >
                     삭제
                   </button>
                 </div>
               )}
            </div>

            <h1 className="fw-bold mb-3" style={{ fontSize: '1.8rem', color: '#333' }}>
              {board.title}
            </h1>

            <div className="d-flex justify-content-between align-items-end text-muted" style={{ fontSize: '0.9rem' }}>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-person-circle fs-5"></i>
                <span className="fw-semibold">{board.authorNickname}</span>
                <span className="mx-1">|</span>
                <span>{board.createdAt?.split('T')[0]}</span>
              </div>
              <div className="d-flex gap-3">
                <span><i className="bi bi-eye me-1"></i>{board.view}</span>
                <span><i className="bi bi-heart-fill text-danger me-1"></i>{board.likeCount}</span>
              </div>
            </div>
          </div>

          {/* 미디어 영역 */}
          {board.files && board.files.length > 0 && (
            <div className="d-flex flex-column gap-3 mb-5">
              {board.files.map((file) => {
                const folder = file.fileType === 'VIDEO' ? '/videos/' : '/images/';
                const src = `${API_BASE_URL}${folder}${file.filePath}`;

                return (
                  <div key={file.id} className="w-100 rounded-3 overflow-hidden border bg-light">
                    {file.fileType === 'VIDEO' ? (
                      <video src={src} controls className="w-100" style={{ maxHeight: '600px' }} />
                    ) : (
                      <img src={src} alt="첨부 이미지" className="w-100 h-auto" style={{ objectFit: 'contain' }} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 본문 내용 */}
          <div className="mb-5" style={{ minHeight: '200px', whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#444' }}>
            {board.content}
          </div>

          {/* 하단 버튼 */}
          <div className="d-flex justify-content-center gap-3 border-top pt-4 mb-4">
            <a href="/board" className="btn btn-outline-secondary px-4 rounded-pill">
              <i className="bi bi-list me-1"></i> 목록으로
            </a>
            <button className="btn btn-outline-danger px-4 rounded-pill">
              <i className="bi bi-heart me-1"></i> 좋아요
            </button>
          </div>

          {/* 댓글 영역 */}
          <CommentList boardId={boardId} />

        </div>
      </div>
    </div>
  );
};

export default BoardDetailPage;