// useBoardPageLogic.ts
import { useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { $user } from '../../../store/authStore';
import { userClient } from '../../../api/index';
import { useBoardDetail } from './useBoardDetail';
import { showConfirm, showSuccess, handleApiError, showError } from '../../../utils/swal'; 

export const useBoardPageLogic = (boardId: string | undefined) => {
  // 1. 데이터 가져오기
  const { board, isLoading } = useBoardDetail(boardId);
  const user = useStore($user);
  
  // 2. 내 글인지 확인
  const isOwner = Boolean(board && user?.nickname === board.authorNickname);

  // 3. 삭제 핸들
  const handleDelete = useCallback(async () => {
    if (!boardId) return;

    // swal: 삭제 확인 질문
    const isConfirmed = await showConfirm(
      "게시글 삭제", 
      "정말 삭제하시겠습니까? 복구할 수 없습니다.", 
      "삭제하기"
    );

    if (!isConfirmed) return;

    try {
      const response = await userClient.api.deleteBoard(Number(boardId), { format: 'json' });
      
      if (response.data.success) {
        // swal: 성공 알림
        await showSuccess("삭제 완료", "게시글이 삭제되었습니다.");
        window.location.href = "/board";
      } else {
        // API 성공 응답이지만 success가 false인 경우 (비즈니스 로직 에러)
        // handleApiError에 가짜 에러 객체를 만들어서 넘기거나 직접 호출
        throw new Error(response.data.errorMessage || "삭제 실패");
      }
    } catch (error: any) {
      handleApiError(error, "삭제 실패", "게시글 삭제 중 오류가 발생했습니다.");
    }
  }, [boardId]);

  // 4. 수정 핸들러
  const handleEdit = useCallback(() => {
    window.location.href = `/board/write?mode=edit&id=${boardId}`;
  }, [boardId]);

  // 5. 목록으로 가기
  const handleGoBack = useCallback(() => {
    window.location.href = "/board";
  }, []);

  // 6. 좋아요 핸들러
  const handleLike = useCallback(() => {
    // 기능 준비 중...
    showError("좋아요 기능은 준비 중입니다!");
  }, []);

  return {
    board,
    isLoading,
    isOwner,
    handleDelete,
    handleEdit,
    handleGoBack,
    handleLike
  };
};