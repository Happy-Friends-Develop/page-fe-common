import React, { useState } from "react";
import type { MyCommentResponse, BoardResponse } from "../../../api/user/userApi";

interface MyActivityTabsProps {
  comments: MyCommentResponse[];
  likedBoards: BoardResponse[];
}

const MyActivityTabs = ({ comments, likedBoards }: MyActivityTabsProps) => {
  const [activeTab, setActiveTab] = useState<"LIKES" | "COMMENTS">("LIKES");

  // 날짜 포맷팅 함수
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="card mt-4 shadow-sm border-0">
      <div className="card-header bg-white border-bottom-0">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "LIKES" ? "active fw-bold text-primary" : "text-muted"}`}
              onClick={() => setActiveTab("LIKES")}
            >
              ❤️ 좋아요 한 글 ({likedBoards.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "COMMENTS" ? "active fw-bold text-primary" : "text-muted"}`}
              onClick={() => setActiveTab("COMMENTS")}
            >
              💬 내가 쓴 댓글 ({comments.length})
            </button>
          </li>
        </ul>
      </div>

      <div className="card-body p-0">
        {/* 좋아요 목록 */}
        {activeTab === "LIKES" && (
          <div className="list-group list-group-flush">
            {likedBoards.length === 0 ? (
              <div className="p-4 text-center text-muted">좋아요 한 게시글이 없습니다.</div>
            ) : (
              likedBoards.map((board) => (
                <a
                  key={board.id}
                  href={`/board/${board.id}`} // 게시글 상세 페이지 이동
                  className="list-group-item list-group-item-action p-3"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1 text-truncate" style={{ maxWidth: "70%" }}>
                      {board.title}
                    </h6>
                    <small className="text-muted">{formatDate(board.createdAt)}</small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-secondary">작성자: {board.authorNickname}</small>
                    <div className="text-muted small">
                      <span className="me-2">👁️ {board.view}</span>
                      <span>❤️ {board.wishListCount}</span>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        )}

        {/* 댓글 목록 */}
        {activeTab === "COMMENTS" && (
          <div className="list-group list-group-flush">
            {comments.length === 0 ? (
              <div className="p-4 text-center text-muted">작성한 댓글이 없습니다.</div>
            ) : (
              comments.map((comment) => (
                <a
                  key={comment.commentId}
                  href={`/board/${comment.boardId}`} // 해당 게시글로 이동
                  className="list-group-item list-group-item-action p-3"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <strong className="mb-1 text-truncate text-dark" style={{ maxWidth: "80%" }}>
                      {comment.content}
                    </strong>
                    <small className="text-muted">{formatDate(comment.createdAt)}</small>
                  </div>
                  <small className="text-secondary d-block mt-1">
                    원문: {comment.boardTitle}
                  </small>
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivityTabs;