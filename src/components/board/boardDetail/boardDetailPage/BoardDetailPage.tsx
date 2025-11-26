// BoardDetailPage.tsx
import React from 'react';
import { useBoardPageLogic } from './useBoardPageLogic';
import BoardDetailView from './BoardDetailView';

interface Props {
  boardId: string | undefined;
}

const BoardDetailPage = ({ boardId }: Props) => {
  // 1. Hook에서 로직과 데이터 다 가져오기
  const { 
    board, 
    isLoading, 
    isOwner, 
    handleDelete, 
    handleEdit, 
    handleGoBack,
    handleLike 
  } = useBoardPageLogic(boardId);

  // 2. 뷰(View)에 데이터와 함수 넘겨주기
  return (
    <BoardDetailView
      boardId={boardId}
      board={board}
      isLoading={isLoading}
      isOwner={isOwner}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onGoBack={handleGoBack}
      onLike={handleLike}
    />
  );
};

export default BoardDetailPage;