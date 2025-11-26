import { useCallback } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "../../../../store/authStore";
import { userClient } from "../../../../api/index";
import { useBoardDetail } from ".././useBoardDetail";
import {
  showConfirm,
  showSuccess,
  handleApiError,
  showError,
} from "../../../../utils/swal";

export const useBoardPageLogic = (boardId: string | undefined) => {
  const { board, isLoading, refetch } = useBoardDetail(boardId);
  const user = useStore($user);

  const isOwner = Boolean(board && user?.nickname === board.authorNickname);

  const handleDelete = useCallback(async () => {
    if (!boardId) return;

    const isConfirmed = await showConfirm(
      "게시글 삭제",
      "정말 삭제하시겠습니까? 복구할 수 없습니다.",
      "삭제하기"
    );

    if (!isConfirmed) return;

    try {
      const response = await userClient.api.deleteBoard(Number(boardId), {
        format: "json",
      });

      if (response.data.success) {
        await showSuccess("삭제 완료", "게시글이 삭제되었습니다.");
        window.location.href = "/board";
      } else {
        throw new Error(response.data.errorMessage || "삭제 실패");
      }
    } catch (error: any) {
      handleApiError(error, "삭제 실패", "게시글 삭제 중 오류가 발생했습니다.");
    }
  }, [boardId]);

  const handleEdit = useCallback(() => {
    window.location.href = `/board/write?mode=edit&id=${boardId}`;
  }, [boardId]);

  const handleGoBack = useCallback(() => {
    window.location.href = "/board";
  }, []);

  const handleLike = useCallback(async () => {
    if (!boardId) return;

    try {
      const response = await userClient.api.toggleLike(Number(boardId), {
        format: "json",
      });

      if (response.data.success) {
        showSuccess("좋아요 성공");
        await refetch();
      } else {
        const msg = response.data.errorMessage || "좋아요 처리에 실패했습니다.";
        showError("실패", msg);
      }
    } catch (error: any) {
      handleApiError(error, "좋아요 실패", "오류가 발생했습니다.");
    }
  }, [boardId, refetch]);

  return {
    board,
    isLoading,
    isOwner,
    handleDelete,
    handleEdit,
    handleGoBack,
    handleLike,
    refetch,
  };
};