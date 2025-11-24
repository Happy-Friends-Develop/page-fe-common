import { useState, useEffect } from 'react';
import { userClient } from '../../../api/index';
import type { BoardResponse } from '../../../api/user/userApi';

export type BoardType = "EAT" | "PLAY" | "STAY" | undefined;

export const useBoardList = () => {
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeType, setActiveType] = useState<BoardType>(undefined);

  const fetchBoards = async (type: BoardType) => {
    setIsLoading(true);
    try {
      const response = await userClient.api.readBoardList(
        { boardType: type },
        { format: 'json' }
      );
      if (response.data.success && response.data.data) {
        setBoards(response.data.data.slice(0, 4));
      }
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(activeType);
  }, [activeType]);

  // 뷰(View)에서 필요한 것들만 보따리에 싸서 내보내요
  return { boards, isLoading, activeType, setActiveType };
};