// types.ts
import type { BoardResponse } from '../../../api/user/userApi';
import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import type { BoardFileResponse } from "../../../api/user/userApi";

// 뷰(UI) 컴포넌트가 받을 Props 정의
export interface BoardDetailViewProps {
  isLoading: boolean;
  board: BoardResponse | null;
  isOwner: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onGoBack: () => void;
  onLike: () => void;
}

// View 컴포넌트가 받을 Props 정의
export interface BoardWriteViewProps {
  isEditMode: boolean;
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  boardType: string;
  setBoardType: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  
  existingFiles: BoardFileResponse[];
  selectedFiles: File[];
  
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveExistingFile: (fileId: number) => void;
  handleSubmit: () => void;
  handleCancel: () => void;
  isPostOpen: boolean;
  setIsPostOpen: Dispatch<SetStateAction<boolean>>;
  handleAddressComplete: (data: any) => void;
}