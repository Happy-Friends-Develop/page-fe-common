// BoardWriteView.tsx
import React from "react";
import DaumPostcode from "react-daum-postcode";
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
  handleCancel,
  // [추가] 주소 검색 관련 Props
  isPostOpen,
  setIsPostOpen,
  handleAddressComplete,
}: BoardWriteViewProps) => {

  // 모달 스타일 (중앙 정렬 팝업)
  const modalStyle = {
    position: "fixed" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    background: "#fff",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    width: "400px", // 필요에 따라 조절 가능
    maxWidth: "90%",
  };

  // 모달 배경 스타일 (어두운 배경)
  const overlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  };

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
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="edit-input"
                    placeholder="주소 검색 버튼을 눌러주세요"
                    value={address}
                    readOnly // 직접 입력 방지
                    onClick={() => setIsPostOpen(true)} // 클릭 시 검색창 열기
                    style={{ cursor: "pointer", backgroundColor: "#fff" }}
                  />
                  <button 
                    className="btn btn-secondary btn-sm" 
                    type="button"
                    onClick={() => setIsPostOpen(true)}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    주소 검색
                  </button>
                </div>
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

          {/* 다음 주소 검색 모달 */}
          {isPostOpen && (
            <>
              {/* 배경 클릭 시 닫기 */}
              <div style={overlayStyle} onClick={() => setIsPostOpen(false)} />
              
              {/* 모달 창 */}
              <div style={modalStyle}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="m-0 fw-bold">주소 검색</h5>
                  <button 
                    className="btn-close" 
                    onClick={() => setIsPostOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <DaumPostcode onComplete={handleAddressComplete} />
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default BoardWriteView;