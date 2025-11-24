import { useState, useEffect, useCallback } from 'react';
import { userClient } from '../../../api/index'; // userClient 경로 확인
import type { CommentResponse } from '../../../api/user/userApi';

export const useBoardComments = (boardId: string | undefined) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터를 가져오는 함수를 따로 만듭니다.
  const fetchComments = useCallback(async () => {
    if (!boardId) return;
    
    // 로딩 시작 (원하면 삭제해도 됨, 깜빡임 방지하려면 삭제 추천)
    // setIsLoading(true); 

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

  // 컴포넌트가 처음 보일 때(boardId가 변경될 때) 실행
  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // refetch 함수를 밖으로 내보냅니다!
  return { comments, isLoading, refetch: fetchComments };
};