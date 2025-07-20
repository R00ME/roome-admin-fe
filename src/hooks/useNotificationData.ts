import { useState, useEffect } from 'react';
import {
  NotificationListResponse,
  UrgentNotificationListResponse,
  UnreadNotificationListResponse,
} from '@/types/notification';
import { NotificationService } from '@/services/notificationService';

export const useNotificationData = () => {
  const [allNotifications, setAllNotifications] =
    useState<NotificationListResponse | null>(null);
  const [urgentNotifications, setUrgentNotifications] =
    useState<UrgentNotificationListResponse | null>(null);
  const [unreadNotifications, setUnreadNotifications] =
    useState<UnreadNotificationListResponse | null>(null);

  const [isAllLoading, setIsAllLoading] = useState(false);
  const [isUrgentLoading, setIsUrgentLoading] = useState(false);
  const [isUnreadLoading, setIsUnreadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllNotifications = async () => {
    setIsAllLoading(true);
    setError(null);
    try {
      const data = await NotificationService.fetchAllNotifications();
      setAllNotifications(data);
    } catch (err) {
      console.error('전체 알림 조회 실패:', err);
      setError('전체 알림을 불러오는데 실패했습니다.');
    } finally {
      setIsAllLoading(false);
    }
  };

  const fetchUrgentNotifications = async () => {
    setIsUrgentLoading(true);
    setError(null);
    try {
      const data = await NotificationService.fetchUrgentNotifications();
      setUrgentNotifications(data);
    } catch (err) {
      console.error('긴급 알림 조회 실패:', err);
      setError('긴급 알림을 불러오는데 실패했습니다.');
    } finally {
      setIsUrgentLoading(false);
    }
  };

  const fetchUnreadNotifications = async () => {
    setIsUnreadLoading(true);
    setError(null);
    try {
      const data = await NotificationService.fetchUnreadNotifications();
      setUnreadNotifications(data);
    } catch (err) {
      console.error('안읽은 알림 조회 실패:', err);
      setError('안읽은 알림을 불러오는데 실패했습니다.');
    } finally {
      setIsUnreadLoading(false);
    }
  };

  const refreshAllData = async () => {
    await Promise.all([
      fetchAllNotifications(),
      fetchUrgentNotifications(),
      fetchUnreadNotifications(),
    ]);
  };

  // 초기 데이터 로드
  useEffect(() => {
    refreshAllData();
  }, []);

  return {
    // 데이터
    allNotifications,
    urgentNotifications,
    unreadNotifications,

    // 로딩 상태
    isAllLoading,
    isUrgentLoading,
    isUnreadLoading,

    // 에러 상태
    error,

    // 액션
    fetchAllNotifications,
    fetchUrgentNotifications,
    fetchUnreadNotifications,
    refreshAllData,
  };
};
