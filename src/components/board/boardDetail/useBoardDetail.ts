import { useState, useEffect } from "react";
import { userClient } from "../../../api/index";
import type { BoardResponse } from "../../../api/user/userApi";
import { handleApiError } from "../../../utils/swal";
export const useBoardDetail = (boardId: string | undefined) => {
  const [board, setBoard] = useState<BoardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!boardId) return;

    const fetchDetail = async () => {
      setIsLoading(true);
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
    };

    fetchDetail();
  }, [boardId]);

  return { board, isLoading };
};
