import React from "react";
import { useMyPageLogic } from "./useMyPageLogic";
import ProfileHeader from "./ProfileHeader";
import InfoCard from "./InfoCard";
import EditUserModal from "./EditUserModal";
import "./MyPage.css";

const MyPage = () => {
  // 1. 훅에서 모든 기능과 상태를 가져옵니다.
  const { 
    userInfo, 
    isLoading, 
    modalState, 
    formState, 
    handleDeleteUser, 
    logout 
  } = useMyPageLogic();

  // 로딩 중일 때 화면
  if (isLoading) {
    return (
      <div className="min-vh-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  // 데이터가 없을 때
  if (!userInfo) return null;

  return (
    <div className="container mt-5 mb-5">
      
      <ProfileHeader 
        userInfo={userInfo} 
        onOpenEdit={modalState.open} 
        onLogout={logout} 
      />

      <InfoCard userInfo={userInfo} />

      {/* 3. 하단 탈퇴 버튼 */}
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-link text-secondary text-decoration-none btn-sm"
          onClick={handleDeleteUser}
        >
          회원 탈퇴하기
        </button>
      </div>

      {/* 4. 수정 모달 팝업 */}
      <EditUserModal
        isOpen={modalState.isOpen}
        onClose={modalState.close}
        formData={formState.data}
        onChange={formState.handleChange}
        onSubmit={formState.handleSubmit}
        isPostOpen={modalState.isPostOpen}
        setPostOpen={modalState.setPostOpen}
        onAddressComplete={formState.handleAddressComplete}
      />
    </div>
  );
};

export default MyPage;