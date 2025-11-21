import React, { useEffect, useState } from "react";
import { userClient } from "../api/index";
import type { UserResponse } from "../api/user/userApi";
import { useAuthStore } from "../store/authStore";

// 1. 리스트 아이템 디자인 컴포넌트 (ProductAccordion 스타일 차용)
const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="d-flex mb-4 align-items-start">
      {/* 보내주신 코드의 SVG 아이콘 (체크 표시) 그대로 사용 */}
      <div className="flex-shrink-0 me-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 23C14.4183 23 18 19.4183 18 15C18 10.5817 14.4183 7 10 7C5.58172 7 2 10.5817 2 15C2 19.4183 5.58172 23 10 23ZM13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929C13.3166 11.9024 12.6834 11.9024 12.2929 12.2929L9 15.5858L7.70711 14.2929C7.31658 13.9024 6.68342 13.9024 6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071L8.29289 17.7071C8.68342 18.0976 9.31658 18.0976 9.70711 17.7071L13.7071 13.7071Z"
            fill="#111827"
          />
        </svg>
      </div>
      <div>
        <span className="fw-bold text-dark me-2">{label}:</span>
        <span className="text-secondary">{value || "-"}</span>
      </div>
    </div>
  );
};

const MyPage = () => {
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.href = "/login";
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await userClient.api.getMyInfo({ format: "json" });
        if (response.data.success && response.data.data) {
          setUserInfo(response.data.data);
        } else {
          alert(response.data.errorMessage || "정보 조회 실패");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="min-vh-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!userInfo) return null;

  return (
    <div className="container mt-5 mb-5">
      <div className="card card-plain">
        {" "}
        {/* card-product 스타일 제거하고 plain 사용 */}
        {/* 2. 상단 타이틀 영역 (ProductOverview와 동일한 구조) */}
        <div className="row">
          <div className="col-12 col-lg-7 mx-auto text-center">
            <h2 className="mb-3">My Page</h2>
            <p className="mb-5 text-secondary">
              회원님의 소중한 개인정보를 확인하고 관리할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="row mt-4">
          {/* 3. 왼쪽: 상세 정보 리스트 (ProductAccordion 스타일 적용) */}
          <div className="col-12 col-lg-6 pe-lg-5 mb-5 mb-lg-0">
            <h4 className="mb-4">Profile Details</h4>
            <p className="mb-5 text-secondary">
              등록된 회원 정보입니다. 변경이 필요한 경우 정보 수정을
              이용해주세요.
            </p>

            <div className="ps-2">
              <InfoItem label="이름" value={userInfo.name || ""} />
              <InfoItem label="닉네임" value={userInfo.nickname || ""} />
              <InfoItem label="전화번호" value={userInfo.phone || ""} />
              <InfoItem label="이메일" value={userInfo.email || ""} />
              <InfoItem label="주소" value={userInfo.address || ""} />
            </div>

            <div className="mt-5 d-flex gap-2">
              <button className="btn btn-dark">정보 수정</button>
              <button className="btn btn-outline-danger">회원 탈퇴</button>
            </div>
          </div>

          {/* 4. 오른쪽: 프로필 이미지 영역 (ProductFeatureImg 자리 대체) */}
          <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center bg-gray-100 rounded-3 p-5">
            <div
              className="rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center mb-4"
              style={{ width: "200px", height: "200px" }}
            >
              {/* 프로필 이미지가 없으면 첫 글자 이니셜 표시 */}
              <span
                className="fw-bold text-primary"
                style={{ fontSize: "5rem" }}
              >
                {userInfo.name ? userInfo.name.charAt(0) : "U"}
              </span>
            </div>
            <h3 className="fw-bold mb-1">{userInfo.name}</h3>
            <p className="text-muted text-center px-4">
              <span className="text-primary fw-bold fs-5">
                {userInfo.nickname}
              </span>
              님 환영합니다! <br />
              Happy Friends와 함께 즐거운 시간 되세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
