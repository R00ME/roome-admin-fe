import { useState } from 'react';
import { NotificationService } from '@/services/notificationService';
import { showSuccessToast } from '@/lib/toast';

export const useNotificationActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkRead = async (
    notificationId: number,
    onSuccess?: () => void,
  ) => {
    setIsLoading(true);
    try {
      await NotificationService.markAsRead(notificationId);
      onSuccess?.();

      // 개별 읽음 처리 성공시 토스트 피드백
      showSuccessToast('알림이 읽음 처리 되었습니다');
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAllRead = async (adminId: number, onSuccess?: () => void) => {
    setIsLoading(true);
    try {
      await NotificationService.markAllAsRead(adminId);
      onSuccess?.();

      // 전체 읽음 처리 성공시 토스트 피드백
      showSuccessToast('모든 알림이 읽음 처리 되었습니다');
    } catch (error) {
      console.error('전체 알림 읽음 처리 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleMarkRead,
    handleMarkAllRead,
  };
};
