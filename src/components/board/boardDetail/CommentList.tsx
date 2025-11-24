import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "../../../store/authStore";
import { useBoardComments } from "./useBoardComments";
import { userClient } from "../../../api/index";
import type { CommentResponse } from "../../../api/user/userApi";

interface Props {
  boardId: string | undefined;
}

// ==========================================
// 1. 개별 댓글 아이템 컴포넌트
// ==========================================
const CommentItem = ({
  comment,
  currentUserNickname,
  onReply,
  onEdit,
  onDelete,
}: {
  comment: CommentResponse;
  currentUserNickname: string; // 현재 로그인한 사용자 닉네임
  onReply: (parentId: number, content: string) => void;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
}) => {
  const [isReplying, setIsReplying] = useState(false); // 답글 모드
  const [isEditing, setIsEditing] = useState(false); // 수정 모드
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content || "");

  // 본인 확인 (닉네임 비교)
  const isOwner = currentUserNickname === comment.authorNickname;

  // 답글 등록 버튼 클릭
  const handleReplySubmit = () => {
    if (!replyContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (comment.id) {
      onReply(comment.id, replyContent);
      setIsReplying(false);
      setReplyContent("");
    }
  };

  // 수정 완료 버튼 클릭
  const handleEditSubmit = () => {
    if (!editContent.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    if (comment.id) {
      onEdit(comment.id, editContent);
      setIsEditing(false);
    }
  };

  return (
    <div className="mb-4">
      {/* 댓글 헤더 */}
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

          {/* 본인 글일 때만 수정/삭제 버튼 표시 */}
          {isOwner && !isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-link p-0 text-muted"
                style={{ fontSize: "0.8rem", textDecoration: "none" }}
              >
                수정
              </button>
              <button
                onClick={() => comment.id && onDelete(comment.id)}
                className="btn btn-link p-0 text-danger"
                style={{ fontSize: "0.8rem", textDecoration: "none" }}
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      {/* 댓글 내용 영역 (수정 모드 vs 일반 모드) */}
      {isEditing ? (
        <div className="mt-2">
          <textarea
            className="form-control mb-2"
            rows={3}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={handleEditSubmit}
            >
              수정 완료
            </button>
          </div>
        </div>
      ) : (
        <div
          className="p-3 bg-light rounded-3 border-0"
          style={{ fontSize: "0.95rem", color: "#444", lineHeight: "1.6" }}
        >
          {comment.content}
        </div>
      )}

      {/* 답글 달기 버튼 */}
      {!isEditing && (
        <div className="mt-1">
          <button
            onClick={() => setIsReplying(!isReplying)}
            className="btn btn-link text-decoration-none p-0 text-muted"
            style={{ fontSize: "0.8rem" }}
          >
            {isReplying ? "닫기" : "답글 달기"}
          </button>
        </div>
      )}

      {/* 대댓글 입력 창 */}
      {isReplying && (
        <div className="mt-2 ms-3">
          <textarea
            className="form-control mb-2"
            rows={2}
            placeholder="답글을 작성해주세요."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="text-end">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={handleReplySubmit}
            >
              등록
            </button>
          </div>
        </div>
      )}

      {/* 대댓글 리스트 (재귀 호출) */}
      {comment.children && comment.children.length > 0 && (
        <div className="ms-4 mt-3 ps-3 border-start border-2">
          {comment.children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              currentUserNickname={currentUserNickname} // 닉네임 계속 전달
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

// 메인 댓글 리스트
const CommentList = ({ boardId }: Props) => {
  const { comments, isLoading, refetch } = useBoardComments(boardId);
  const [newComment, setNewComment] = useState("");
  const user = useStore($user);
  const currentUserNickname = user?.nickname || "";

  const handleCreateRootComment = async () => {
    if (!newComment.trim()) return alert("내용을 입력하세요.");
    if (!boardId) return;

    try {
      await userClient.api.createComment(
        Number(boardId),
        { content: newComment },
        { format: "json" }
      );
      setNewComment("");
      refetch();
    } catch (err) {
      console.error(err);
      alert("댓글 작성 실패");
    }
  };

  // 2. 대댓글(답글) 작성
  const handleReply = async (parentId: number, content: string) => {
    if (!boardId) return;
    try {
        await userClient.api.createComment(
            Number(boardId), 
            { content, parentId }, 
            { format: 'json' }
        );
        refetch(); 
    } catch (err) {
        console.error(err);
        alert('답글 작성 실패');
    }
  };

  // 3. 댓글 수정
  const handleEdit = async (commentId: number, content: string) => {
    try {
        await userClient.api.updateComment(
            commentId, 
            { content }, 
            { format: 'json' }
        );
        refetch(); 
    } catch (err) {
        console.error(err);
        alert('수정 실패 (본인 댓글만 수정 가능합니다)');
    }
  };

  // 4. 댓글 삭제
  const handleDelete = async (commentId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
        await userClient.api.deleteComment(
            commentId, 
            { format: 'json' }
        );
        refetch(); 
    } catch (err) {
        console.error(err);
        alert('삭제 실패 (본인 댓글만 삭제 가능합니다)');
    }
  };

  if (isLoading)
    return <div className="py-3 text-center text-muted">댓글 로딩 중...</div>;

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
              <button
                className="btn btn-primary px-4 rounded-pill"
                onClick={handleCreateRootComment}
              >
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
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="text-center py-5 bg-light rounded-3 text-muted">
          <i className="bi bi-chat-square-dots fs-3 mb-2 d-block"></i>
          아직 작성된 댓글이 없습니다.
          <br />첫 번째 댓글을 남겨보세요!
        </div>
      )}
    </div>
  );
};

export default CommentList;
