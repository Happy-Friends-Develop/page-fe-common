// types.ts
import type { BoardResponse } from '../../../api/user/userApi';

// 뷰(UI) 컴포넌트가 받을 Props 정의
export interface BoardDetailViewProps {
  isLoading: boolean;
  board: BoardResponse | null;
  isOwner: boolean; // 내가 쓴 글인지 여부
  onDelete: () => void;
  onEdit: () => void;
  onGoBack: () => void;
  onLike: () => void;
}