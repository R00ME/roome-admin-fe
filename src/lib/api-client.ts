import axios from 'axios';
import { showErrorToast } from '@/lib/toast';

// API 클라이언트 생성
export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

// 응답 인터셉터 - 에러 발생 시 자동으로 토스트 표시
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 에러 타입별로 다른 메시지 표시
    if (error.code === 'ECONNABORTED') {
      showErrorToast(
        '요청 시간이 초과되었습니다',
        '잠시 후 다시 시도해주세요.',
      );
    } else if (error.response?.status === 401) {
      showErrorToast('인증이 필요합니다', '다시 로그인해주세요.');
    } else if (error.response?.status === 403) {
      showErrorToast('접근 권한이 없습니다', '관리자에게 문의하세요.');
    } else if (error.response?.status === 404) {
      showErrorToast('요청한 리소스를 찾을 수 없습니다');
    } else if (error.response?.status >= 500) {
      showErrorToast('서버 오류가 발생했습니다', '잠시 후 다시 시도해주세요.');
    } else if (error.message === 'Network Error') {
      showErrorToast('네트워크 연결을 확인해주세요');
    } else {
      // 기본 에러 메시지
      const message =
        error.response?.data?.message || '알 수 없는 오류가 발생했습니다';
      showErrorToast(message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
