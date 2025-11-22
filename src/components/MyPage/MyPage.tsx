import React, { useEffect, useState } from "react";
import { userClient } from "../../api/index";
import type { UserResponse } from "../../api/user/userApi";
import { useStore } from '@nanostores/react';
import { $accessToken, logout } from "../../store/authStore"; 

import "./MyPage.css";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useStore($accessToken);

  useEffect(() => {
    // 토큰이 없으면 로그인 페이지로 보냄
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
          // 토큰은 있지만 유효하지 않은 경우 등 처리
          alert(response.data.errorMessage || "정보 조회 실패");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken]); // accessToken이 바뀌면(로그아웃 등) 자동으로 다시 실행됨

  if (isLoading) {
    return (
      <div className="min-vh-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!userInfo) return null;

  const profileImageSrc = "https://via.placeholder.com/150";

  return (
    <div className="container mt-5 mb-5">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-image-container">
              <img src={profileImageSrc} id="profileImage" alt="Profile" />
              <div className="image-overlay">
                <i className="bi bi-camera-fill"></i>
                <span>변경</span>
              </div>
              <input type="file" id="profileUpload" accept="image/*" />
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{userInfo.name}</h2>
              <span className="profile-role">
                {userInfo.nickname || "회원"}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-dark me-2">
              <i className="bi bi-pencil-square"></i> 정보 수정
            </button>

            <button className="btn btn-outline-danger" onClick={logout}>
              <i className="bi bi-box-arrow-right"></i> 로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="info-card">
            <h3>기본 정보</h3>
            <ul className="info-list">
              <li className="info-item">
                <div className="info-icon"><i className="bi bi-person-fill"></i></div>
                <div className="info-label">이름</div>
                <div className="info-value">{userInfo.name}</div>
              </li>
              <li className="info-item">
                <div className="info-icon"><i className="bi bi-emoji-smile-fill"></i></div>
                <div className="info-label">닉네임</div>
                <div className="info-value">{userInfo.nickname || "-"}</div>
              </li>
              <li className="info-item">
                <div className="info-icon"><i className="bi bi-telephone-fill"></i></div>
                <div className="info-label">전화번호</div>
                <div className="info-value">{userInfo.phone || "-"}</div>
              </li>
              <li className="info-item">
                <div className="info-icon"><i className="bi bi-envelope-fill"></i></div>
                <div className="info-label">이메일</div>
                <div className="info-value">{userInfo.email || "-"}</div>
              </li>
              <li className="info-item">
                <div className="info-icon"><i className="bi bi-geo-alt-fill"></i></div>
                <div className="info-label">주소</div>
                <div className="info-value">{userInfo.address || "-"}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="d-flex justify-content-end">
        <button className="btn btn-link text-secondary text-decoration-none btn-sm">
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default MyPage;