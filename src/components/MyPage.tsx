import React, { useEffect, useState } from 'react';
import { userClient } from '../api/index';
import type { UserResponse } from '../api/user/userApi';
import { useAuthStore } from '../store/authStore';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 튕겨냄
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      window.location.href = '/login';
      return;
    }

    const fetchUserInfo = async () => {
      try {
        // 사용자 정보 조회 API 호출
        const response = await userClient.api.getMyInfo({ format: 'json' });
        
        if (response.data.success && response.data.data) {
          setUserInfo(response.data.data);
        } else {
          alert(response.data.errorMessage || '정보를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('MyPage Error:', error);
        // 401 에러 등은 commonApi의 customFetch에서 처리되거나 여기서 처리
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow border-0 rounded-3">
        <div className="card-header bg-transparent border-0 p-4 pb-0">
          <h3 className="mb-0 fw-bold text-primary">내 정보</h3>
          <p className="text-muted small">회원님의 등록된 정보입니다.</p>
        </div>
        
        <div className="card-body p-4">
          {userInfo ? (
            <div className="row">
              {/* 왼쪽: 프로필 요약 */}
              <div className="col-md-4 text-center border-end mb-4 mb-md-0">
                <div className="avatar avatar-xl rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                  {userInfo.name ? userInfo.name.charAt(0) : 'U'}
                </div>
                <h5 className="fw-bold">{userInfo.name}</h5>
                <span className="badge bg-light text-dark mb-2">{userInfo.nickname}</span>
                <p className="text-muted small">{userInfo.email}</p>
              </div>

              {/* 오른쪽: 상세 정보 */}
              <div className="col-md-8 ps-md-4">
                <h6 className="text-uppercase text-muted text-xs font-weight-bolder mb-3">상세 정보</h6>
                
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">아이디 (ID No.)</label>
                  <div className="fw-bold">{userInfo.id}</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">전화번호</label>
                  <div className="fw-bold">{userInfo.phone || '-'}</div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">주소</label>
                  <div className="fw-bold">{userInfo.address || '-'}</div>
                </div>

                <hr className="my-4" />
                
                <div className="d-flex justify-content-end">
                  <button className="btn btn-outline-primary btn-sm me-2">정보 수정</button>
                  <button className="btn btn-outline-danger btn-sm">회원 탈퇴</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <p>사용자 정보를 찾을 수 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;