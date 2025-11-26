import React from "react";
import { useMyPageLogic } from "./mainMyPage/useMyPageLogic";
import ProfileHeader from "./mainMyPage/ProfileHeader";
import InfoCard from "./mainMyPage/InfoCard";
import EditUserModal from "./mainMyPage/EditUserModal";
import MyActivityTabs from "./mainMyPage/MyActivityTabs";
import "./MyPage.css";

const MyPage = () => {
  // 1. 훅에서 데이터와 상태를 가져옵니다.
  const { 
    userInfo,
    myComments, 
    likedBoards,
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
      
      {/* 프로필 헤더 */}
      <ProfileHeader 
        userInfo={userInfo} 
        onOpenEdit={modalState.open} 
        onLogout={logout} 
      />

      {/* 내 정보 카드 */}
      <InfoCard userInfo={userInfo} />

      {/* 활동 내역 탭 (좋아요 목록 / 내 댓글) */}
      <MyActivityTabs comments={myComments} likedBoards={likedBoards} />

      {/* 하단 탈퇴 버튼 */}
      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-link text-secondary text-decoration-none btn-sm"
          onClick={handleDeleteUser}
        >
          회원 탈퇴하기
        </button>
      </div>

      {/* 수정 모달 팝업 */}
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