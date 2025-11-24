// BoardListSection.tsx
import React from 'react';
import { useBoardList } from './useBoardList'; 
import BoardCard from './BoardCard'; 

const BoardListSection = () => {
    // 메인페이지는 4개만 불러오기
  const { boards, isLoading, activeType, setActiveType } = useBoardList(4);

  return (
    <section className="my-5">
      <div className="container">
        {/* 헤더 및 필터 영역 */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h3 className="font-weight-bold">🔥 요즘 뜨는 소식</h3>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="btn-group">
              {/* 필터 버튼 컴포넌트도 분리하면 더 좋지만 일단 여기에 */}
              <FilterButton label="전체" isActive={activeType === undefined} onClick={() => setActiveType(undefined)} />
              <FilterButton label="먹거리" isActive={activeType === "EAT"} onClick={() => setActiveType("EAT")} />
              <FilterButton label="놀거리" isActive={activeType === "PLAY"} onClick={() => setActiveType("PLAY")} />
              <FilterButton label="잘거리" isActive={activeType === "STAY"} onClick={() => setActiveType("STAY")} />
            </div>
          </div>
        </div>

        {/* 리스트 영역 */}
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

        <div className="text-center mt-3">
          <a href="/board" className="btn btn-outline-dark btn-sm">
            게시글 더보기 <i className="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

const FilterButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
  <button 
    className={`btn btn-sm ${isActive ? 'btn-dark' : 'btn-outline-secondary'}`}
    onClick={onClick}
    style={{ borderRadius: '20px', margin: '0 2px' }}
  >
    {label}
  </button>
);

export default BoardListSection;