import React, { useEffect, useState } from "react";
import { userClient } from "../../../api/index";
import { useStore } from "@nanostores/react";
import { $user } from "../../../store/authStore";
import type { BoardFileResponse } from "../../../api/user/userApi";
import "./../../MyPage/MyPage.css";
import "./BoardWritePage.css";

const BoardWritePage = () => {
  const user = useStore($user);

  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode");
  const boardId = searchParams.get("id");

  const isEditMode = mode === "edit";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [boardType, setBoardType] = useState("EAT");
  const [address, setAddress] = useState("");

  // 새로 올릴 파일들
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 이미 서버에 있는 파일들
  const [existingFiles, setExistingFiles] = useState<BoardFileResponse[]>([]);

  // 삭제할 기존 파일의 ID 목록
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);

  useEffect(() => {
    if (isEditMode && boardId) {
      const fetchBoardData = async () => {
        try {
          const response = await userClient.api.readBoard(Number(boardId), {
            format: "json",
          });

          if (response.data.success && response.data.data) {
            const data = response.data.data;
            setTitle(data.title || "");
            setContent(data.content || "");
            setAddress(data.address || "");
            if (data.files) {
              setExistingFiles(data.files);
            }
          }
        } catch (error) {
          console.error("데이터 불러오기 실패", error);
          alert("게시글 정보를 가져오지 못했습니다.");
        }
      };
      fetchBoardData();
    }
  }, [isEditMode, boardId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  // 기존 파일 삭제 핸들러 (화면에서만 지우고 ID 저장)
  const handleRemoveExistingFile = (fileId: number) => {
    // 삭제할 ID 목록에 추가
    setDeleteFileIds((prev) => [...prev, fileId]);

    // 화면 목록에서 제거
    setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      return alert("제목과 내용을 모두 입력해주세요.");
    }

    try {
      // 1. 보낼 데이터 객체 생성
      const boardData = {
        title,
        content,
        boardType: boardType as "EAT" | "PLAY" | "STAY",
        address,
        deleteFileIds, // 삭제할 파일 ID 목록도 같이 보냄
      };

      // 2. 객체를 JSON 문자열로 변환
      const boardRequestJson = JSON.stringify(boardData);

      if (isEditMode && boardId) {
        // [수정 요청]
        await userClient.api.updateBoard(
          Number(boardId),
          {
            boardRequest: boardRequestJson,
            files: selectedFiles.length > 0 ? selectedFiles : undefined,
          },
          { format: "json" } 
        );
        alert("게시글이 수정되었습니다!");
      } else {
        // [작성 요청]
        await userClient.api.createBoard(
          {
            boardRequest: boardRequestJson,
            files: selectedFiles,
          },
          { format: "json" }
        );
        alert("새 글이 등록되었습니다!");
      }

      window.location.href = isEditMode ? `/board/${boardId}` : "/board";
    } catch (error) {
      console.error("저장 실패", error);
      alert("저장 중 오류가 발생했습니다.");
    }
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

            {/* 기존 파일 목록 (수정 모드일 때만 표시) */}
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
                        <i
                          className={`bi ${
                            file.fileType === "VIDEO"
                              ? "bi-camera-video"
                              : "bi-image"
                          } me-2 text-primary`}
                        ></i>
                        <span className="small text-secondary">
                          {file.originalName}
                        </span>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        style={{ fontSize: "12px", padding: "2px 6px" }}
                        onClick={() =>
                          file.id && handleRemoveExistingFile(file.id)
                        }
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
            <button
              className="btn-cancel"
              onClick={() => window.history.back()}
            >
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

export default BoardWritePage;
