import React, { useEffect, useState } from "react";
import { userClient } from "../../api/index";
import type { UserResponse } from "../../api/user/userApi";
import { useAuthStore } from "../../store/authStore";
import "./MyPage.css";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/login";
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await userClient.api.getMyInfo({ format: "json" });
        if (response.data.success && response.data.data) {
          setUserInfo(response.data.data);
        } else {
          alert(response.data.errorMessage || "정보 조회 실패");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="min-vh-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!userInfo) return null;

  // 프로필 이미지가 없을 때 보여줄 기본 이미지 처리 (이니셜 등)
  const profileImageSrc = "https://via.placeholder.com/150"; // 실제 이미지가 있다면 userInfo.profileImage 사용

  return (
    <div className="container mt-5 mb-5">
      {/* 1. 상단 프로필 섹션 (profile-container 스타일 적용) */}
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-left">
            {/* 프로필 이미지 및 오버레이 효과 */}
            <div className="profile-image-container">
              <img
                src={profileImageSrc}
                id="profileImage"
                alt="Profile"
              />
              <div className="image-overlay">
                <i className="bi bi-camera-fill"></i> {/* 카메라 아이콘 예시 */}
                <span>변경</span>
              </div>
              <input type="file" id="profileUpload" accept="image/*" />
            </div>

            {/* 이름 및 역할 정보 */}
            <div className="profile-info">
              <h2 className="profile-name">{userInfo.name}</h2>
              <span className="profile-role">
                {userInfo.nickname || "회원"}
              </span>
            </div>
          </div>

          {/* 우측 버튼 영역 */}
          <div className="profile-actions">
            <button className="btn btn-dark me-2">
              <i className="bi bi-pencil-square"></i> 정보 수정
            </button>
            <button className="btn btn-outline-danger">
              <i className="bi bi-box-arrow-right"></i> 로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* 2. 하단 상세 정보 카드 (info-card 스타일 적용) */}
      <div className="row">
        <div className="col-12">
          <div className="info-card">
            <h3>기본 정보</h3>
            <ul className="info-list">
              {/* 이름 */}
              <li className="info-item">
                <div className="info-icon">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="info-label">이름</div>
                <div className="info-value">{userInfo.name}</div>
              </li>

              {/* 닉네임 */}
              <li className="info-item">
                <div className="info-icon">
                  <i className="bi bi-emoji-smile-fill"></i>
                </div>
                <div className="info-label">닉네임</div>
                <div className="info-value">{userInfo.nickname || "-"}</div>
              </li>

              {/* 전화번호 */}
              <li className="info-item">
                <div className="info-icon">
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className="info-label">전화번호</div>
                <div className="info-value">{userInfo.phone || "-"}</div>
              </li>

              {/* 이메일 */}
              <li className="info-item">
                <div className="info-icon">
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className="info-label">이메일</div>
                <div className="info-value">{userInfo.email || "-"}</div>
              </li>

              {/* 주소 */}
              <li className="info-item">
                <div className="info-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className="info-label">주소</div>
                <div className="info-value">{userInfo.address || "-"}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 회원 탈퇴 버튼 영역 (필요 시 추가) */}
      <div className="d-flex justify-content-end">
        <button className="btn btn-link text-secondary text-decoration-none btn-sm">
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default MyPage;