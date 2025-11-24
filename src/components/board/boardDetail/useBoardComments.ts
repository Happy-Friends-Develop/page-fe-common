import { useState, useEffect, useCallback } from 'react';
import { userClient } from '../../../api/index';
import type { CommentResponse } from '../../../api/user/userApi';

export const useBoardComments = (boardId: string | undefined) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 조회 (Fetch)
  const fetchComments = useCallback(async () => {
    if (!boardId) return;
    try {
      const id = Number(boardId);
      const response = await userClient.api.getComments(id, { format: 'json' });
      if (response.data.success && response.data.data) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("댓글 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [boardId]);

  // 2. 생성 (Create)
  const createComment = useCallback(async (content: string, parentId?: number) => {
    if (!boardId) return;
    try {
      await userClient.api.createComment(
        Number(boardId),
        { content, parentId },
        { format: 'json' }
      );
      await fetchComments(); // 성공 시 목록 새로고침
      return true;
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
      return false;
    }
  }, [boardId, fetchComments]);

  // 3. 수정 (Update)
  const updateComment = useCallback(async (commentId: number, content: string) => {
    try {
      await userClient.api.updateComment(
        commentId,
        { content },
        { format: 'json' }
      );
      await fetchComments();
      return true;
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("수정 권한이 없거나 오류가 발생했습니다.");
      return false;
    }
  }, [fetchComments]);

  // 4. 삭제 (Delete)
  const deleteComment = useCallback(async (commentId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return false;
    try {
      await userClient.api.deleteComment(commentId, { format: 'json' });
      await fetchComments();
      return true;
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("삭제 권한이 없거나 오류가 발생했습니다.");
      return false;
    }
  }, [fetchComments]);

  // 초기 로딩
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { 
    comments, 
    isLoading, 
    createComment, 
    updateComment, 
    deleteComment,
    refetch: fetchComments 
  };
};