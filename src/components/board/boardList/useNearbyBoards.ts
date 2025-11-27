import { useState } from "react";
import { userClient } from "../../../api/index";
import type { BoardResponse } from "../../../api/user/userApi";
import { handleApiError, showError, showSuccess } from "../../../utils/swal";

export const useNearbyBoards = () => {
  const [boards, setBoards] = useState<BoardResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 검색 조건 상태
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(5.0); // 기본값 5km

  // 1. 내 주변 게시글 검색 API 호출
  const fetchNearbyBoards = async () => {
    if (!address.trim()) {
      return showError("주소 입력", "검색할 주소를 입력해주세요.");
    }

    setIsLoading(true);
    try {
      const response = await userClient.api.findNearbyBoards(
        { address, radius },
        { format: "json" }
      );

      if (response.data.success && response.data.data) {
        setBoards(response.data.data);
      } else {
        setBoards([]);
      }
    } catch (error) {
      console.error("주변 게시글 검색 실패:", error);
      handleApiError(error, "검색 실패", "주변 게시글을 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. 현재 위치(좌표) -> 주소 변환 API 호출
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      return showError("오류", "이 브라우저는 위치 정보를 지원하지 않습니다.");
    }

    // 로딩 시작 (위치 따고 주소 받아오는 동안)
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // 백엔드에 좌표 -> 주소 변환 요청
          const response = await userClient.api.getAddressByCoord(
            {
              latitude,
              longitude,
            },
            { format: "json" }
          );

          console.log("주소 변환 응답:", response);

          if (response.data && response.data.success && response.data.data) {
            setAddress(response.data.data);
            showSuccess("위치 확인", "현재 위치 주소를 가져왔습니다!");
          } else {
            showError(
              "주소 변환 실패",
              response.data.errorMessage || "주소를 찾을 수 없습니다."
            );
          }
        } catch (error) {
          console.error("주소 변환 API 오류", error);
          showError(
            "오류",
            "현재 위치의 주소를 가져오는 중 오류가 발생했습니다."
          );
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation 오류", error);
        showError(
          "위치 확인 실패",
          "위치 정보를 가져올 수 없습니다. 권한을 확인해주세요."
        );
        setIsLoading(false);
      }
    );
  };

  return {
    boards,
    isLoading,
    address,
    setAddress,
    radius,
    setRadius,
    fetchNearbyBoards,
    handleCurrentLocation,
  };
};
