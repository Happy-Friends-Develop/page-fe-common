import React, { useEffect, useState } from 'react';
import { userClient } from '../../api/index';
import type { BoardResponse } from '../../api/user/userApi';

// 카테고리 타입 정의
type BoardType = "EAT" | "PLAY" | "STAY" | undefined;

const BoardListSection = () => {
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeType, setActiveType] = useState<BoardType>(undefined); // 전체 보기(undefined)가 기본

  // 게시글 불러오기
  const fetchBoards = async (type: BoardType) => {
    setIsLoading(true);
    try {
      // API 호출 (쿼리 파라미터로 boardType 전달)
      const response = await userClient.api.readBoardList(
        { boardType: type },
        { format: 'json' }
      );

      if (response.data.success && response.data.data) {
        // 최신순 4개 또는 8개만 자르기 (메인 페이지니까 많이 보여줄 필요 없음)
        // response.data.data가 배열이라고 가정
        setBoards(response.data.data.slice(0, 4)); 
      }
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 탭이 바뀔 때마다 데이터 다시 부르기
  useEffect(() => {
    fetchBoards(activeType);
  }, [activeType]);

  return (
    <section className="my-5">
      <div className="container">
        {/* 1. 섹션 헤더 (제목 + 필터 탭) */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h3 className="font-weight-bold">🔥 요즘 뜨는 소식</h3>
            <p className="text-muted">Happy Friends의 생생한 이야기를 확인해보세요.</p>
          </div>
          <div className="col-md-6 text-md-end">
            {/* 필터 버튼들 */}
            <div className="btn-group">
              <FilterButton label="전체" isActive={activeType === undefined} onClick={() => setActiveType(undefined)} />
              <FilterButton label="먹거리" isActive={activeType === "EAT"} onClick={() => setActiveType("EAT")} />
              <FilterButton label="놀거리" isActive={activeType === "PLAY"} onClick={() => setActiveType("PLAY")} />
              <FilterButton label="잘거리" isActive={activeType === "STAY"} onClick={() => setActiveType("STAY")} />
            </div>
          </div>
        </div>

        {/* 2. 게시글 카드 리스트 */}
        <div className="row">
          {isLoading ? (
            <div className="text-center py-5 w-100">
               <div className="spinner-border text-primary" role="status" />
            </div>
          ) : boards.length > 0 ? (
            boards.map((board) => (
              <div className="col-md-6 col-lg-3 mb-4" key={board.id}>
                <BoardCard board={board} />
              </div>
            ))
          ) : (
            <div className="text-center py-5 w-100 text-muted">
              등록된 게시글이 없습니다.
            </div>
          )}
        </div>
        
        {/* 더보기 버튼 */}
        <div className="text-center mt-3">
          <a href="/board" className="btn btn-outline-dark btn-sm">
            게시글 더보기 <i className="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

// [내부 컴포넌트 1] 필터 버튼
const FilterButton = ({ label, isActive, onClick }: any) => (
  <button 
    className={`btn btn-sm ${isActive ? 'btn-dark' : 'btn-outline-secondary'}`}
    onClick={onClick}
    style={{ borderRadius: '20px', margin: '0 2px' }}
  >
    {label}
  </button>
);

// [내부 컴포넌트 2] 게시글 카드
const BoardCard = ({ board }: { board: BoardResponse }) => {
  
  // [수정됨] fileUrl 대신 thumbnailPath 또는 filePath 사용
  // 1. 파일이 있는지 확인
  const firstFile = board.files && board.files.length > 0 ? board.files[0] : null;
  
  // 2. 썸네일이 있으면 썸네일, 없으면 원본, 둘 다 없으면 회색 박스
  const thumbSrc = firstFile
    ? (firstFile.thumbnailPath || firstFile.filePath) // <-- 여기가 핵심 변경!
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
      {/* 이미지 영역 */}
      <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
        <img 
          src={thumbSrc} 
          alt={board.title} 
          className="w-100 h-100" 
          style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          // 이미지가 깨졌을 때(404) 처리 (선택사항)
          onError={e => {
            e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>
      
      {/* 텍스트 영역 */}
      <div className="card-body p-3">
        <div className="mb-2">
          <span className="badge bg-light text-dark border">
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

export default BoardListSection;