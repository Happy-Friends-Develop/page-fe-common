import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "../../../../store/authStore";
import { useBoardComments } from "./useBoardComments";
import CommentItem from "./CommentItem";

interface Props {
  boardId: string | undefined;
}

const CommentList = ({ boardId }: Props) => {
  // Hook에서 데이터와 모든 기능(함수)을 한 번에 가져옵니다.
  const { 
    comments, 
    isLoading, 
    createComment, 
    updateComment, 
    deleteComment 
  } = useBoardComments(boardId);
  
  const [newComment, setNewComment] = useState("");
  const user = useStore($user);
  const currentUserNickname = user?.nickname || "";

  // 1. 최상위 댓글 등록 핸들러
  const handleCreateRoot = async () => {
    if (!newComment.trim()) return alert("내용을 입력하세요.");
    const success = await createComment(newComment);
    if (success) setNewComment("");
  };

  if (isLoading) return <div className="py-3 text-center text-muted">댓글 로딩 중...</div>;

  return (
    <div className="mt-5 pt-5 border-top">
      <h5 className="fw-bold mb-4 d-flex align-items-center">
        <i className="bi bi-chat-quote-fill me-2 text-primary"></i>
        댓글 <span className="ms-1 text-primary">{comments.length}</span>
      </h5>

      {/* 새 댓글 작성 영역 */}
      <div className="mb-5">
        <div className="card border-0 bg-light">
          <div className="card-body">
            <textarea
              className="form-control border-0 bg-white mb-2"
              rows={3}
              placeholder="댓글을 남겨보세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="text-end">
              <button className="btn btn-primary px-4 rounded-pill" onClick={handleCreateRoot}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserNickname={currentUserNickname}
            onReply={(parentId, content) => createComment(content, parentId)} // 훅의 함수 재사용
            onEdit={updateComment} // 훅의 함수 재사용
            onDelete={deleteComment} // 훅의 함수 재사용
          />
        ))
      ) : (
        <div className="text-center py-5 bg-light rounded-3 text-muted">
          <i className="bi bi-chat-square-dots fs-3 mb-2 d-block"></i>
          아직 작성된 댓글이 없습니다.<br />첫 번째 댓글을 남겨보세요!
        </div>
      )}
    </div>
  );
};

export default CommentList;