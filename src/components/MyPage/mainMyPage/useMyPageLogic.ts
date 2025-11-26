import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $accessToken, logout } from "../../../store/authStore";
import { userClient } from "../../../api/index";
import type {
  UserResponse,
  UserUpdateRequest,
  MyCommentResponse,
  BoardResponse,
} from "../../../api/user/userApi";
import {
  showSuccess,
  showError,
  showConfirm,
  showPrompt,
  handleApiError,
} from "../../../utils/swal";

export const useMyPageLogic = () => {
  const accessToken = useStore($accessToken);

  // 상태 관리
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [myComments, setMyComments] = useState<MyCommentResponse[]>([]);
  const [likedBoards, setLikedBoards] = useState<BoardResponse[]>([]);
  const [editFormData, setEditFormData] = useState<UserUpdateRequest>({
    name: "",
    nickname: "",
    phone: "",
    email: "",
    address: "",
    birth: "",
  });

  // 1. 내 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const response = await userClient.api.getMyInfo({ format: "json" });
      if (response.data.success && response.data.data) {
        setUserInfo(response.data.data);
      }
    } catch (error) {
      handleApiError(error, "조회 실패", "정보를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 내 댓글 가져오기
  const fetchMyComments = async () => {
    try {
      const response = await userClient.api.getMyComments({ format: "json" });
      if (response.data.success && response.data.data) {
        setMyComments(response.data.data);
      }
    } catch (error) {
      console.error("댓글 조회 실패", error);
    }
  };

  // 좋아요 한 게시글 가져오기
  const fetchLikedBoards = async () => {
    try {
      const response = await userClient.api.readBoardLikeList({
        format: "json",
      });
      if (response.data.success && response.data.data) {
        setLikedBoards(response.data.data);
      }
    } catch (error) {
      console.error("좋아요 목록 조회 실패", error);
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      if (!accessToken) {
        await showConfirm(
          "로그인 필요",
          "로그인이 필요한 서비스입니다.",
          "로그인하러 가기"
        );
        window.location.href = "/login";
        return;
      }

      setIsLoading(true);
      // 병렬로 요청하여 속도 향상
      await Promise.all([
        fetchUserInfo(),
        fetchMyComments(),
        fetchLikedBoards(),
      ]);
      setIsLoading(false);
    };

    loadAllData();
  }, [accessToken]);
  // 2. 모달 열기
  const openEditModal = () => {
    if (userInfo) {
      setEditFormData({
        name: userInfo.name || "",
        nickname: userInfo.nickname || "",
        phone: userInfo.phone || "",
        email: userInfo.email || "",
        address: userInfo.address || "",
        birth: "",
      });
    }
    setIsEditModalOpen(true);
  };

  // 3. 입력값 변경
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. 주소 검색 완료
  const handleCompletePost = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setEditFormData((prev) => ({ ...prev, address: fullAddress }));
    setIsPostOpen(false);
  };

  // 5. 정보 수정 API
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo || !userInfo.id) return;

    const isConfirmed = await showConfirm(
      "정보 수정",
      "입력한 내용으로 정보를 수정하시겠습니까?"
    );
    if (!isConfirmed) return;

    try {
      const response = await userClient.api.updateUserInfo(
        userInfo.id,
        editFormData,
        { format: "json" }
      );

      if (response.data && response.data.success) {
        await showSuccess("수정 완료", "정보가 성공적으로 수정되었습니다.");
        setIsEditModalOpen(false);
        fetchUserInfo();
      } else {
        showError(
          "수정 실패",
          response.data?.errorMessage || "수정에 실패했습니다."
        );
      }
    } catch (error) {
      handleApiError(error, "수정 실패", "수정 중 오류가 발생했습니다.");
    }
  };

  // 6. 회원 탈퇴 API
  const handleDeleteUser = async () => {
    if (!userInfo || !userInfo.id) return;

    const inputValues = await showPrompt(
      "회원 탈퇴",
      "탈퇴하시려면 '동의합니다'라고 입력해주세요.\n모든 정보가 삭제되며 복구할 수 없습니다.",
      "동의합니다"
    );

    if (inputValues !== "동의합니다") {
      if (inputValues) showError("입력 오류", "입력 문구가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await userClient.api.deleteUser(userInfo.id, {
        format: "json",
      });

      if (response.data && response.data.success) {
        await showSuccess("탈퇴 완료", "회원 탈퇴가 완료되었습니다.");
        logout();
        window.location.href = "/";
      } else {
        showError(
          "탈퇴 실패",
          response.data?.errorMessage || "탈퇴 처리에 실패했습니다."
        );
      }
    } catch (error) {
      handleApiError(error, "오류", "탈퇴 처리 중 오류가 발생했습니다.");
    }
  };

  return {
    userInfo,
    myComments,
    likedBoards,
    isLoading,
    modalState: {
      isOpen: isEditModalOpen,
      open: openEditModal,
      close: () => setIsEditModalOpen(false),
      isPostOpen,
      setPostOpen: setIsPostOpen,
    },
    formState: {
      data: editFormData,
      handleChange: handleEditChange,
      handleAddressComplete: handleCompletePost,
      handleSubmit: handleUpdateSubmit,
    },
    handleDeleteUser,
    logout,
  };
};