import React, { useState } from 'react';
import { useBoardList } from './useBoardList'; 
import { useNearbyBoards } from './useNearbyBoards';
import BoardCard from './BoardCard'; 
import NearbySearch from './NearbySearch';
import './BoardAllPage.css'; 

const BoardAllPage = () => {
  // 탭 상태: "ALL" (전체보기) | "NEARBY" (주변찾기)
  const [viewMode, setViewMode] = useState<"ALL" | "NEARBY">("ALL");
  const { boards: allBoards, isLoading: isAllLoading, activeType, setActiveType } = useBoardList();
  // 내 주변 검색 훅
  const { 
    boards: nearbyBoards, 
    isLoading: isNearbyLoading, 
    address, setAddress, 
    radius, setRadius, 
    fetchNearbyBoards,
    handleCurrentLocation
  } = useNearbyBoards();

  // 현재 보여줄 리스트와 로딩 상태 결정
  const displayBoards = viewMode === "ALL" ? allBoards : nearbyBoards;
  const isLoading = viewMode === "ALL" ? isAllLoading : isNearbyLoading;

  return (
    <div className="board-page-container">
      
      {/* 헤더 영역 */}
      <div className="board-header">
        <div className="container">
          <h2 className="board-title">게시글 탐색</h2>
          <p className="board-subtitle">원하는 장소의 이야기를 찾아보세요.</p>
          
          {/* 모드 전환 탭 */}
          <div className="d-flex justify-content-center mt-4 gap-2">
            <button 
                className={`btn rounded-pill px-4 ${viewMode === 'ALL' ? 'btn-dark' : 'btn-outline-dark border-0'}`}
                onClick={() => setViewMode('ALL')}
            >
                전체 목록
            </button>
            <button 
                className={`btn rounded-pill px-4 ${viewMode === 'NEARBY' ? 'btn-dark' : 'btn-outline-dark border-0'}`}
                onClick={() => setViewMode('NEARBY')}
            >
                📍 내 주변 찾기
            </button>
          </div>

          {/* 전체 목록일 때만 카테고리 필터 보이기 */}
          {viewMode === 'ALL' && (
            <div className="filter-container mt-4">
              <FilterButton label="전체" isActive={activeType === undefined} onClick={() => setActiveType(undefined)} />
              <FilterButton label="먹거리" isActive={activeType === "EAT"} onClick={() => setActiveType("EAT")} />
              <FilterButton label="놀거리" isActive={activeType === "PLAY"} onClick={() => setActiveType("PLAY")} />
              <FilterButton label="잘거리" isActive={activeType === "STAY"} onClick={() => setActiveType("STAY")} />
            </div>
          )}
        </div>
      </div>

      <div className="container pb-5">
        
        {/* 주변 찾기 모드일 때 검색창 표시 */}
        {viewMode === 'NEARBY' && (
            <NearbySearch 
                address={address}
                setAddress={setAddress}
                radius={radius}
                setRadius={setRadius}
                onSearch={fetchNearbyBoards}
                onCurrentLocation={handleCurrentLocation}
            />
        )}

        <div className="row g-4 board-grid">
          {isLoading ? (
            <div className="loading-container w-100">
               <div className="spinner-border text-primary" role="status" />
            </div>
          ) : displayBoards.length > 0 ? (
            displayBoards.map((board) => (
              <div className="col-12 col-md-6 col-lg-3" key={board.id}>
                <BoardCard board={board} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="empty-message py-5">
                <i className="bi bi-search mb-3" style={{fontSize: '2rem', color: '#ccc'}}></i>
                <p className="text-muted">
                    {viewMode === 'NEARBY' 
                        ? "검색된 주변 게시글이 없습니다.\n주소나 반경을 변경해보세요!" 
                        : "등록된 게시글이 없습니다."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 필터 버튼 (기존 유지)
const FilterButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    className={`filter-btn ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default BoardAllPage;