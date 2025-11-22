import React from 'react';
import type { UserResponse } from '../../api/user/userApi';

interface Props {
  userInfo: UserResponse;
  onOpenEdit: () => void;
  onLogout: () => void;
}

const ProfileHeader = ({ userInfo, onOpenEdit, onLogout }: Props) => {
  const profileImageSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userInfo.name || "Happy"
  )}&background=e94d1c&color=fff&size=150&font-size=0.5`;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-left">
          <div className="profile-image-container" style={{ cursor: "default" }}>
            <img src={profileImageSrc} id="profileImage" alt="Profile" />
          </div>

          <div className="profile-info">
            <h2 className="profile-name">{userInfo.name}</h2>
            <span className="profile-role">{userInfo.nickname || "회원"}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-dark me-2" onClick={onOpenEdit}>
            <i className="bi bi-pencil-square"></i> 정보 수정
          </button>

          <button className="btn btn-outline-danger" onClick={onLogout}>
            <i className="bi bi-box-arrow-right"></i> 로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;