import { useState, useEffect, useCallback } from "react";
import { userClient } from "../../../api/index";
import type { BoardResponse } from "../../../api/user/userApi";
import { handleApiError } from "../../../utils/swal";

export const useBoardDetail = (boardId: string | undefined) => {
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 함수 재사용 가능하게 처리
  const fetchDetail = useCallback(async () => {
    if (!boardId) return;
    try {
      const id = Number(boardId);
      const response = await userClient.api.readBoard(id, { format: "json" });

      if (response.data?.success && response.data?.data) {
        setBoard(response.data.data);
      }
    } catch (error) {
      console.error("게시글 상세 조회 실패:", error);
      handleApiError(error, "게시글 조회 실패", "게시글 조회 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [boardId]);

  // useEffect에서는 만들어진 함수를 호출
  useEffect(() => {
    setIsLoading(true);
    fetchDetail();
  }, [fetchDetail]);

  // refetch라는 이름으로 함수를 내보냄
  return { board, isLoading, refetch: fetchDetail };
};