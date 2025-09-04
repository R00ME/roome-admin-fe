import { useState } from 'react';
import { NotificationService } from '@/services/notificationService';

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
