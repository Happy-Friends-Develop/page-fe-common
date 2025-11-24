import React from 'react';
import { useBoardList } from './useBoardList'; 
import BoardCard from './BoardCard'; 
import './BoardAllPage.css'; 

const BoardAllPage = () => {
  const { boards, isLoading, activeType, setActiveType } = useBoardList();

  return (
    <div className="board-page-container">
      
      {/* 헤더 영역 */}
      <div className="board-header">
        <div className="container">
          <h2 className="board-title">전체 게시글 목록</h2>
          <p className="board-subtitle">Happy Friends의 모든 이야기를 한눈에 확인해보세요.</p>
          
          {/* 필터 버튼 */}
          <div className="filter-container mt-4">
            <FilterButton label="전체" isActive={activeType === undefined} onClick={() => setActiveType(undefined)} />
            <FilterButton label="먹거리" isActive={activeType === "EAT"} onClick={() => setActiveType("EAT")} />
            <FilterButton label="놀거리" isActive={activeType === "PLAY"} onClick={() => setActiveType("PLAY")} />
            <FilterButton label="잘거리" isActive={activeType === "STAY"} onClick={() => setActiveType("STAY")} />
          </div>
        </div>
      </div>

      <div className="container pb-5">

        <div className="row g-4 board-grid">
          {isLoading ? (
            <div className="loading-container w-100">
               <div className="spinner-border text-primary" role="status" />
            </div>
          ) : boards.length > 0 ? (
            boards.map((board) => (

              <div className="col-12 col-md-6 col-lg-3" key={board.id}>
                <BoardCard board={board} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="empty-message">
                <i className="bi bi-journal-x mb-3" style={{fontSize: '2rem'}}></i>
                <p>등록된 게시글이 없습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 필터 버튼
const FilterButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    className={`filter-btn ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default BoardAllPage;