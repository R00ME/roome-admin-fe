import { useCallback } from 'react';
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
  showLoadingToast,
} from '@/lib/toast';

/**
 * 토스트 관련 기능을 제공하는 React 훅
 */
export const useToast = () => {
  const success = useCallback((message: string, description?: string) => {
    showSuccessToast(message, description);
  }, []);

  const error = useCallback((message: string, description?: string) => {
    showErrorToast(message, description);
  }, []);

  const info = useCallback((message: string, description?: string) => {
    showInfoToast(message, description);
  }, []);

  const warning = useCallback((message: string, description?: string) => {
    showWarningToast(message, description);
  }, []);

  const loading = useCallback(
    <T>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
    ) => {
      return showLoadingToast(promise, messages);
    },
    [],
  );

  return {
    success,
    error,
    info,
    warning,
    loading,
  };
};
