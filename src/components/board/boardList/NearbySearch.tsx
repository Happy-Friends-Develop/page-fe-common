import React from 'react';
import './NearbySearch.css';
interface NearbySearchProps {
  address: string;
  setAddress: (val: string) => void;
  radius: number;
  setRadius: (val: number) => void;
  onSearch: () => void;
  onCurrentLocation: () => void;
}

const NearbySearch = ({ 
  address, setAddress, radius, setRadius, onSearch, onCurrentLocation 
}: NearbySearchProps) => {

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(parseFloat(e.target.value));
  };

  return (
    <div className="card nearby-card mb-5">
      
      <h4 className="nearby-title">
        <i className="bi bi-map-fill"></i>
        내 주변 탐색
      </h4>
      
      <div className="row g-3 align-items-end">
        {/* 1. 주소 입력 */}
        <div className="col-md-5">
          <label className="nearby-label">중심 위치 (주소)</label>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control nearby-input" 
              placeholder="예: 서울시청, 강남구 역삼동" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <button 
                className="btn btn-location" 
                type="button" 
                onClick={onCurrentLocation}
                title="현위치 찾기"
            >
                <i className="bi bi-geo-alt-fill"></i>
            </button>
          </div>
        </div>

        {/* 2. 반경(km) 설정 - 슬라이더 & 숫자 입력 */}
        <div className="col-md-5">
            <div className="d-flex justify-content-between mb-1">
                <label className="nearby-label">검색 범위</label>
                <span className="radius-value">{radius} km</span>
            </div>
            
            <div className="d-flex align-items-center gap-2">
                <input 
                    type="range" 
                    className="form-range nearby-range flex-grow-1" 
                    min="0.1" 
                    max="50" 
                    step="0.1" 
                    value={radius}
                    onChange={handleSliderChange} 
                />
                
                <input 
                    type="number" 
                    className="form-control nearby-input text-center" 
                    style={{ width: '80px' }}
                    min="0.1"
                    max="50"
                    step="0.1"
                    value={radius}
                    onChange={handleSliderChange}
                />
            </div>
        </div>

        {/* 3. 검색 버튼 */}
        <div className="col-md-2">
            <button 
                className="btn btn-nearby-search" 
                onClick={onSearch}
            >
                검색하기
            </button>
        </div>
      </div>
    </div>
  );
};

export default NearbySearch;