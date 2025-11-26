// BoardWritePage.tsx
import React from "react";
import { useBoardWrite } from "./useBoardWrite";
import BoardWriteView from "./BoardWriteView";

const BoardWritePage = () => {
  // 1. Hook을 통해 모든 로직과 데이터를 가져옵니다.
  const boardWriteLogic = useBoardWrite();

  // 2. View 컴포넌트에 Props로 전달합니다. (Spread Operator 활용)
  return <BoardWriteView {...boardWriteLogic} />;
};

export default BoardWritePage;