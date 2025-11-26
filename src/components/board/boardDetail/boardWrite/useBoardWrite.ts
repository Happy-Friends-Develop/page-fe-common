// useBoardWrite.ts
import { useEffect, useState, type ChangeEvent } from "react";
import { userClient } from "../../../../api/index";
import type { BoardFileResponse } from "../../../../api/user/userApi";

export const useBoardWrite = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");
  const boardId = searchParams.get("id");
  const isEditMode = mode === "edit";

  // State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("EAT");
  const [address, setAddress] = useState("");
  
  // File State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<BoardFileResponse[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  // 데이터 불러오기 (수정 모드 시)
  useEffect(() => {
    if (isEditMode && boardId) {
      const fetchBoardData = async () => {
        try {
          const response = await userClient.api.readBoard(Number(boardId), {
            format: "json",
          });

          if (response.data.success && response.data.data) {
            const data = response.data.data;
            setTitle(data.title || "");
            setContent(data.content || "");
            setAddress(data.address || "");
            if (data.files) {
              setExistingFiles(data.files);
            }
          }
        } catch (error) {
          console.error("데이터 불러오기 실패", error);
          alert("게시글 정보를 가져오지 못했습니다.");
        }
      };
      fetchBoardData();
    }
  }, [isEditMode, boardId]);

  // 핸들러: 파일 선택
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  // 핸들러: 기존 파일 삭제
  const handleRemoveExistingFile = (fileId: number) => {
    setDeleteFileIds((prev) => [...prev, fileId]);
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // 핸들러: 취소
  const handleCancel = () => {
    window.history.back();
  };

  // 핸들러: 제출
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      return alert("제목과 내용을 모두 입력해주세요.");
    }

    try {
      const boardData = {
        title,
        content,
        boardType: boardType as "EAT" | "PLAY" | "STAY",
        address,
        deleteFileIds,
      };

      const boardRequestJson = JSON.stringify(boardData);

      if (isEditMode && boardId) {
        await userClient.api.updateBoard(
          Number(boardId),
          {
            boardRequest: boardRequestJson,
            files: selectedFiles.length > 0 ? selectedFiles : undefined,
          },
          { format: "json" }
        );
        alert("게시글이 수정되었습니다!");
      } else {
        await userClient.api.createBoard(
          {
            boardRequest: boardRequestJson,
            files: selectedFiles,
          },
          { format: "json" }
        );
        alert("새 글이 등록되었습니다!");
      }

      window.location.href = isEditMode ? `/board/${boardId}` : "/board";
    } catch (error) {
      console.error("저장 실패", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // View에서 필요한 모든 값과 함수 반환
  return {
    isEditMode,
    title, setTitle,
    content, setContent,
    boardType, setBoardType,
    address, setAddress,
    existingFiles,
    selectedFiles,
    handleFileChange,
    handleRemoveExistingFile,
    handleSubmit,
    handleCancel
  };
};