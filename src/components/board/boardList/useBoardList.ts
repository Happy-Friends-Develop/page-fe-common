import { useState, useEffect } from 'react';
import { userClient } from '../../../api/index';
import type { BoardResponse } from '../../../api/user/userApi';
import { handleApiError } from '../../../utils/swal'; 
export type BoardType = "EAT" | "PLAY" | "STAY" | undefined;

// limit 인자를 받도록 변경 (값이 없으면 0으로 처리)
export const useBoardList = (limit: number = 0) => {
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
        const allData = response.data.data;
        
        // limit이 0보다 크면 자르고, 아니면 전체 다 보여주기
        if (limit > 0) {
            setBoards(allData.slice(0, limit));
        } else {
            setBoards(allData);
        }
      }
    } catch (error) {
      console.error("게시글 로딩 실패:", error);
      handleApiError(error, "게시글 목록 조회 실패", "게시글 목록 조회에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards(activeType);
  }, [activeType]); // activeType이 바뀔 때마다 다시 불러옴

  return { boards, isLoading, activeType, setActiveType };
};