// useBoardWrite.ts
import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import axios from "axios"; 
import { userClient } from "../../../../api/index"; 
import type { BoardFileResponse } from "../../../../api/user/userApi";
import { getAuthHeader } from "../../../../utils/authUtils"; 
import { showSuccess, showError, handleApiError } from "../../../../utils/swal";

export const useBoardWrite = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");
  const boardId = searchParams.get("id");
  const isEditMode = mode === "edit";
  const BASE_URL = import.meta.env.PUBLIC_API_URL;

  // State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("EAT");
  const [address, setAddress] = useState("");
  
  // 주소 검색 모달 상태
  const [isPostOpen, setIsPostOpen] = useState(false);

  // File State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<BoardFileResponse[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  // 데이터 불러오기
  useEffect(() => {
    if (isEditMode && boardId) {
       const fetchBoardData = async () => {
        try {
          const response = await userClient.api.readBoard(Number(boardId), { format: "json" });
          if (response.data.success && response.data.data) {
            const data = response.data.data;
            setTitle(data.title || "");
            setContent(data.content || "");
            setAddress(data.address || "");
            if (data.files) setExistingFiles(data.files);
          }
        } catch (error) {
           // 로딩 실패는 console만 찍거나 조용히 처리
           console.error("데이터 불러오기 실패", error);
        }
      };
      fetchBoardData();
    }
  }, [isEditMode, boardId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleRemoveExistingFile = (fileId: number) => {
    setDeleteFileIds((prev) => [...prev, fileId]);
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleCancel = () => {
    window.history.back();
  };

  // 주소 포맷팅
  const handleAddressComplete = (data: any) => {
    let fullAddress = data.address; 
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    
    setAddress(fullAddress);
    setIsPostOpen(false);
  };

  // 핸들러: 제출
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      showError("입력 오류", "제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      const boardData = {
        title,
        content,
        boardType: boardType as "EAT" | "PLAY" | "STAY",
        address,
        deleteFileIds,
      };

      const formData = new FormData();
      formData.append("boardRequest", JSON.stringify(boardData));

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });
      }

      const authHeaders = getAuthHeader();
      const config = { headers: { ...authHeaders } };

      if (isEditMode && boardId) {
        await axios.put(`${BASE_URL}/api/user/board/${boardId}`, formData, config);
        await showSuccess("수정 완료", "게시글이 수정되었습니다!"); 
      } else {
        await axios.post(`${BASE_URL}/api/user/board`, formData, config);
        await showSuccess("작성 완료", "새 글이 등록되었습니다!");
      }

      window.location.href = isEditMode ? `/board/${boardId}` : "/board";
    } catch (error) {
      console.error("저장 실패", error);
      handleApiError(error, "저장 실패", "게시글 저장 중 문제가 발생했습니다."); 
    }
  };

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
    handleCancel,
    
    isPostOpen,
    setIsPostOpen,
    handleAddressComplete,
  };
};