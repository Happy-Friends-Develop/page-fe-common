import React, { useState } from 'react';
import type { CommentResponse } from '../../../../api/user/userApi';

interface CommentItemProps {
  comment: CommentResponse;
  currentUserNickname: string;
  onReply: (parentId: number, content: string) => void;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}

const CommentItem = ({
  comment,
  currentUserNickname,
  onReply,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content || "");

  const isOwner = currentUserNickname === comment.authorNickname;

  const handleReplySubmit = () => {
    if (!replyContent.trim()) return alert("내용을 입력해주세요.");
    if (comment.id) {
      onReply(comment.id, replyContent);
      setIsReplying(false);
      setReplyContent("");
    }
  };

  const handleEditSubmit = () => {
    if (!editContent.trim()) return alert("내용을 입력해주세요.");
    if (comment.id) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-person-circle text-secondary"></i>
          <span className="fw-bold" style={{ fontSize: "0.9rem" }}>
            {comment.authorNickname}
          </span>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <small className="text-muted" style={{ fontSize: "0.8rem" }}>
            {comment.createdAt?.replace("T", " ").slice(0, 16)}
          </small>
          {isOwner && !isEditing && (
            <>
              <button onClick={() => setIsEditing(true)} className="btn btn-link p-0 text-muted" style={{ fontSize: "0.8rem", textDecoration: "none" }}>수정</button>
              <button onClick={() => comment.id && onDelete(comment.id)} className="btn btn-link p-0 text-danger" style={{ fontSize: "0.8rem", textDecoration: "none" }}>삭제</button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea className="form-control mb-2" rows={3} value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>취소</button>
            <button className="btn btn-sm btn-primary" onClick={handleEditSubmit}>수정 완료</button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-light rounded-3 border-0" style={{ fontSize: "0.95rem", color: "#444", lineHeight: "1.6" }}>
          {comment.content}
        </div>
      )}

      {!isEditing && (
        <div className="mt-1">
          <button onClick={() => setIsReplying(!isReplying)} className="btn btn-link text-decoration-none p-0 text-muted" style={{ fontSize: "0.8rem" }}>
            {isReplying ? "닫기" : "답글 달기"}
          </button>
        </div>
      )}

      {isReplying && (
        <div className="mt-2 ms-3">
          <textarea className="form-control mb-2" rows={2} placeholder="답글을 작성해주세요." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} />
          <div className="text-end">
            <button className="btn btn-sm btn-outline-primary" onClick={handleReplySubmit}>등록</button>
          </div>
        </div>
      )}

      {comment.children && comment.children.length > 0 && (
        <div className="ms-4 mt-3 ps-3 border-start border-2">
          {comment.children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              currentUserNickname={currentUserNickname}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;