import { toast } from 'sonner';

/**
 * API 성공 시 사용할 토스트
 */
export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
    duration: 3000,
  });
};

/**
 * API 실패 시 사용할 토스트
 */
export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
    duration: 3000,
  });
};

/**
 * 일반 정보 토스트
 */
export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description,
    duration: 3000,
  });
};

/**
 * 경고 토스트
 */
export const showWarningToast = (message: string, description?: string) => {
  toast.warning(message, {
    description,
    duration: 3000,
  });
};

/**
 * 로딩 토스트 (Promise와 함께 사용)
 */
export const showLoadingToast = <T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error: string;
  },
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};

/**
 * API 응답에 따른 자동 토스트
 */
export const handleApiResponse = <T>(
  response: T,
  successMessage: string,
  errorMessage?: string,
) => {
  try {
    // 성공 응답으로 간주되는 경우
    showSuccessToast(successMessage);
    return response;
  } catch (error) {
    // 에러 발생 시
    const message = errorMessage || '작업 중 오류가 발생했습니다.';
    showErrorToast(message);
    throw error;
  }
};
