import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const BRAND_COLOR = '#e94d1c';

// 1. 성공 알림 (단순 확인)
export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    confirmButtonColor: BRAND_COLOR,
    confirmButtonText: '확인',
  });
};

// 2. 에러 알림 (단순 확인)
export const showError = (title: string, text?: string) => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    confirmButtonColor: BRAND_COLOR,
    confirmButtonText: '확인',
  });
};

// 3. 질문 알림 (Yes / No)
export const showConfirm = async (title: string, text: string, confirmText = '네, 진행합니다') => {
  const result = await Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    showCancelButton: true,
    confirmButtonColor: BRAND_COLOR,
    cancelButtonColor: '#7d7d7d',
    confirmButtonText: confirmText,
    cancelButtonText: '취소',
  });
  return result.isConfirmed;
};

// 4. 입력 알림 (회원 탈퇴 시 사용)
export const showPrompt = async (title: string, text: string, placeholder: string) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    input: 'text',
    inputPlaceholder: placeholder,
    showCancelButton: true,
    confirmButtonColor: BRAND_COLOR,
    cancelButtonColor: '#7d7d7d',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  });
  return result.value; // 입력한 텍스트 반환
};

// 5. 스마트 에러 핸들러
export const handleApiError = (error: any, title: string, text: string) => {
  // 401 에러(로그인 만료)면 index.ts가 처리하니까 조용히 넘어감
  if (error?.status === 401 || error?.response?.status === 401) {
    return;
  }
  
  // 진짜 에러일 때만 알림창 띄움
  showError(title, text);
};