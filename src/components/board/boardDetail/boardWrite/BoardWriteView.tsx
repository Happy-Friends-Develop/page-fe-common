// BoardWriteView.tsx
import React from "react";
import ".././../../MyPage/MyPage.css";
import "./BoardWritePage.css";
import { type BoardWriteViewProps } from ".././types";

const BoardWriteView = ({
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
}: BoardWriteViewProps) => {
  return (
    <div className="container board-write-container">
      <div className="main-content">
        <div className="board-write-card-body">
          <h2 className="board-write-title">
            {isEditMode ? "게시글 수정" : "새 글 작성"}
          </h2>

          {/* 제목 */}
          <div className="edit-form-group">
            <label className="edit-label">제목</label>
            <input
              type="text"
              className="edit-input"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 카테고리 & 주소 */}
          <div className="row">
            <div className="col-md-6">
              <div className="edit-form-group">
                <label className="edit-label">카테고리</label>
                <select
                  className="edit-input cursor-pointer"
                  value={boardType}
                  onChange={(e) => setBoardType(e.target.value)}
                >
                  <option value="EAT">먹거리</option>
                  <option value="PLAY">놀거리</option>
                  <option value="STAY">잘거리</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="edit-form-group">
                <label className="edit-label">장소 (선택)</label>
                <input
                  type="text"
                  className="edit-input"
                  placeholder="주소를 입력하세요"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 파일 업로드 영역 */}
          <div className="edit-form-group">
            <label className="edit-label">이미지/동영상 첨부</label>

            {/* 기존 파일 목록 */}
            {existingFiles.length > 0 && (
              <div className="mb-3 p-3 bg-light rounded border">
                <p className="text-muted small mb-2 fw-bold">
                  기존 첨부 파일 ({existingFiles.length}개)
                </p>
                <ul className="list-unstyled mb-0">
                  {existingFiles.map((file) => (
                    <li
                      key={file.id}
                      className="d-flex align-items-center justify-content-between mb-2 p-2 bg-white rounded border-bottom"
                    >
                      <div className="d-flex align-items-center text-truncate">
                        <i className={`bi ${file.fileType === "VIDEO" ? "bi-camera-video" : "bi-image"} me-2 text-primary`}></i>
                        <span className="small text-secondary">{file.originalName}</span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        style={{ fontSize: "12px", padding: "2px 6px" }}
                        onClick={() => file.id && handleRemoveExistingFile(file.id)}
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 새 파일 업로드 */}
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" style={{ width: "100%" }}>
              <div className="file-upload-box">
                <i className="bi bi-cloud-arrow-up fs-1 text-secondary mb-2"></i>
                <p className="mb-0 fw-bold" style={{ color: "#555" }}>
                  클릭하여 새 파일을 추가하세요
                </p>
                <p className="text-muted small mb-0">
                  (이미지, 동영상 가능 / 여러 개 선택 가능)
                </p>
              </div>
            </label>

            {/* 새로 추가된 파일 목록 */}
            {selectedFiles.length > 0 && (
              <div className="file-list-area">
                <strong className="file-count" style={{ color: "#28a745" }}>
                  + 새로 추가됨 ({selectedFiles.length}개):
                </strong>
                <ul className="mb-0 mt-2 ps-3">
                  {selectedFiles.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 내용 입력 */}
          <div className="edit-form-group">
            <label className="edit-label">내용</label>
            <textarea
              className="edit-input no-resize"
              rows={12}
              placeholder="내용을 자유롭게 작성해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* 버튼 영역 */}
          <div className="modal-actions mt-5">
            <button className="btn-cancel" onClick={handleCancel}>
              취소
            </button>
            <button className="btn-save" onClick={handleSubmit}>
              {isEditMode ? "수정 완료" : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardWriteView;