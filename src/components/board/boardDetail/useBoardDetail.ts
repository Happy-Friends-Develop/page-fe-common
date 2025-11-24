import { useState, useEffect } from 'react';
import { userClient } from '../../../api/index';
import type { BoardResponse } from '../../../api/user/userApi';

export const useBoardDetail = (boardId: string | undefined) => {
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!boardId) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const id = Number(boardId);

        const response = await userClient.api.readBoard(id, { format: 'json' });

        if (response.data?.success && response.data?.data) {
          setBoard(response.data.data);
        }
      } catch (error) {
        console.error("게시글 상세 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [boardId]);

  return { board, isLoading };
};