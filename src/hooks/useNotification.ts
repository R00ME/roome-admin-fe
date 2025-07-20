import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getAllNotifications,
  getUrgentNotifications,
  getUnreadNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/apis/notification';
import {
  NotificationListResponse,
  UrgentNotificationListResponse,
  UnreadNotificationListResponse,
  MarkAllReadRequest,
  NotificationItem,
  NotificationCategory,
} from '@/types/notification';

export type NotificationTab = 'all' | 'urgent' | 'unread';

interface UseNotificationReturn {
  // 데이터 상태
  allNotifications: NotificationListResponse | null;
  urgentNotifications: UrgentNotificationListResponse | null;
  unreadNotifications: UnreadNotificationListResponse | null;

  // 로딩 상태
  isLoading: boolean;
  isAllLoading: boolean;
  isUrgentLoading: boolean;
  isUnreadLoading: boolean;

  // 에러 상태
  error: string | null;

  // 액션 함수들
  fetchAllNotifications: () => Promise<void>;
  fetchUrgentNotifications: () => Promise<void>;
  fetchUnreadNotifications: () => Promise<void>;
  handleMarkAllRead: (adminId: number) => Promise<void>;
  handleMarkRead: (notificationId: number) => Promise<void>;

  // 유틸리티 함수들
  getNotificationCount: (tab: NotificationTab) => number;
  getUnreadCount: () => number;
  getUrgentCount: () => number;
}

export const useNotification = (): UseNotificationReturn => {
  // 데이터 상태
  const [allNotifications, setAllNotifications] =
    useState<NotificationListResponse | null>(null);
  const [urgentNotifications, setUrgentNotifications] =
    useState<UrgentNotificationListResponse | null>(null);
  const [unreadNotifications, setUnreadNotifications] =
    useState<UnreadNotificationListResponse | null>(null);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isAllLoading, setIsAllLoading] = useState(false);
  const [isUrgentLoading, setIsUrgentLoading] = useState(false);
  const [isUnreadLoading, setIsUnreadLoading] = useState(false);

  // 에러 상태
  const [error, setError] = useState<string | null>(null);

  // 임시 더미 데이터 - useMemo로 감싸서 재생성 방지
  const dummyNotifications = useMemo(() => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const oneDayAgo = new Date(now.getTime() - 86400000);
    const twoHoursAgo = new Date(now.getTime() - 7200000);
    const thirtyMinutesAgo = new Date(now.getTime() - 1800000);

    return [
      {
        notificationId: 1,
        message: '새로운 이벤트가 등록되었습니다.',
        category: 'EVENT' as NotificationCategory,
        isUrgent: false,
        isRead: false,
        timestamp: now.toISOString(),
      },
      {
        notificationId: 2,
        message: '시스템 점검이 완료되었습니다.',
        category: 'SYSTEM' as NotificationCategory,
        isUrgent: true,
        isRead: false,
        timestamp: oneHourAgo.toISOString(),
      },
      {
        notificationId: 3,
        message: '새로운 사용자가 가입했습니다.',
        category: 'USER' as NotificationCategory,
        isUrgent: false,
        isRead: true,
        timestamp: oneDayAgo.toISOString(),
      },
      {
        notificationId: 4,
        message: '배포가 성공적으로 완료되었습니다.',
        category: 'CICD' as NotificationCategory,
        isUrgent: false,
        isRead: false,
        timestamp: twoHoursAgo.toISOString(),
      },
      {
        notificationId: 5,
        message: '시스템 오류가 발생했습니다.',
        category: 'SYSTEM' as NotificationCategory,
        isUrgent: true,
        isRead: false,
        timestamp: thirtyMinutesAgo.toISOString(),
      },
    ];
  }, []);

  // 전체 알림 조회
  const fetchAllNotifications = useCallback(async () => {
    setIsAllLoading(true);
    setError(null);

    try {
      const data = await getAllNotifications();
      if (data && typeof data === 'object') {
        setAllNotifications(data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.warn('전체 알림 조회 실패, dummy 데이터 사용:', err);
      setAllNotifications({
        totalCount: dummyNotifications.length,
        unreadCount: dummyNotifications.filter((n) => !n.isRead).length,
        urgentCount: dummyNotifications.filter((n) => n.isUrgent).length,
        notifications: dummyNotifications,
      });
    } finally {
      setIsAllLoading(false);
    }
  }, [dummyNotifications]);

  // 긴급 알림 조회
  const fetchUrgentNotifications = useCallback(async () => {
    setIsUrgentLoading(true);
    setError(null);

    try {
      const data = await getUrgentNotifications();
      setUrgentNotifications(data);
    } catch (err) {
      console.warn('긴급 알림 조회 실패, dummy 데이터 사용:', err);
      const urgent = dummyNotifications.filter((n) => n.isUrgent);
      setUrgentNotifications({
        totalCount: urgent.length,
        notifications: urgent,
      });
    } finally {
      setIsUrgentLoading(false);
    }
  }, [dummyNotifications]);

  // 안읽은 알림 조회
  const fetchUnreadNotifications = useCallback(async () => {
    setIsUnreadLoading(true);
    setError(null);

    try {
      const data = await getUnreadNotifications();
      setUnreadNotifications(data);
    } catch (err) {
      console.warn('안읽은 알림 조회 실패, dummy 데이터 사용:', err);
      const unread = dummyNotifications.filter((n) => !n.isRead);
      setUnreadNotifications({
        totalCount: unread.length,
        notifications: unread,
      });
    } finally {
      setIsUnreadLoading(false);
    }
  }, [dummyNotifications]);

  // 전체 읽음 처리
  const handleMarkAllRead = useCallback(
    async (adminId: number) => {
      setIsLoading(true);
      setError(null);

      try {
        const requestData: MarkAllReadRequest = { adminId };
        await markAllNotificationsRead(requestData);

        // 성공 시 모든 알림 데이터를 다시 조회
        await Promise.all([
          fetchAllNotifications(),
          fetchUrgentNotifications(),
          fetchUnreadNotifications(),
        ]);
      } catch (err) {
        console.warn('전체 읽음 처리 실패:', err);
        // Mock 응답으로 처리하고 데이터 업데이트
        const mockResponse = { message: '전체 읽음 처리 실패' };
        console.log('Mock 응답:', mockResponse.message);

        // Mock 데이터에서 읽음 상태 업데이트
        if (allNotifications) {
          const updatedAllNotifications = { ...allNotifications };
          Object.keys(updatedAllNotifications).forEach((date) => {
            if (Array.isArray(updatedAllNotifications[date])) {
              (updatedAllNotifications[date] as NotificationItem[]).forEach(
                (notification) => {
                  notification.isRead = true;
                },
              );
            }
          });
          updatedAllNotifications.unreadCount = 0;
          setAllNotifications(updatedAllNotifications);
        }

        if (unreadNotifications) {
          setUnreadNotifications({ totalCount: 0 });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      allNotifications,
      unreadNotifications,
      fetchAllNotifications,
      fetchUrgentNotifications,
      fetchUnreadNotifications,
    ],
  );

  // 개별 읽음 처리
  const handleMarkRead = useCallback(
    async (notificationId: number) => {
      setIsLoading(true);
      setError(null);

      try {
        await markNotificationRead(notificationId);

        // 성공 시 관련 데이터를 다시 조회
        await Promise.all([
          fetchAllNotifications(),
          fetchUrgentNotifications(),
          fetchUnreadNotifications(),
        ]);
      } catch (err) {
        console.warn('개별 읽음 처리 실패:', err);
        // Mock 응답으로 처리하고 데이터 업데이트
        const mockResponse = { message: '개별 읽음 처리 실패' };
        console.log('Mock 응답:', mockResponse.message);

        // Mock 데이터에서 해당 알림의 읽음 상태 업데이트
        const updateNotificationReadStatus = (
          notifications:
            | NotificationListResponse
            | UnreadNotificationListResponse
            | null,
        ): NotificationListResponse | UnreadNotificationListResponse | null => {
          if (!notifications) return notifications;

          const updated = { ...notifications };
          Object.keys(updated).forEach((date) => {
            if (Array.isArray(updated[date])) {
              (updated[date] as NotificationItem[]).forEach((notification) => {
                if (notification.notificationId === notificationId) {
                  notification.isRead = true;
                }
              });
            }
          });

          // unreadCount 업데이트
          if (
            'unreadCount' in updated &&
            typeof updated.unreadCount === 'number'
          ) {
            updated.unreadCount = Math.max(0, updated.unreadCount - 1);
          }

          return updated;
        };

        setAllNotifications(
          (prev) =>
            updateNotificationReadStatus(
              prev,
            ) as NotificationListResponse | null,
        );
        setUnreadNotifications(
          (prev) =>
            updateNotificationReadStatus(
              prev,
            ) as UnreadNotificationListResponse | null,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAllNotifications, fetchUrgentNotifications, fetchUnreadNotifications],
  );

  // 알림 개수 조회 함수들
  const getNotificationCount = useCallback(
    (tab: NotificationTab): number => {
      switch (tab) {
        case 'all':
          return allNotifications?.totalCount || 0;
        case 'urgent':
          return urgentNotifications?.totalCount || 0;
        case 'unread':
          return unreadNotifications?.totalCount || 0;
        default:
          return 0;
      }
    },
    [allNotifications, urgentNotifications, unreadNotifications],
  );

  const getUnreadCount = useCallback((): number => {
    return allNotifications?.unreadCount || 0;
  }, [allNotifications]);

  const getUrgentCount = useCallback((): number => {
    return allNotifications?.urgentCount || 0;
  }, [allNotifications]);

  // 컴포넌트 마운트 시 전체 알림 조회
  useEffect(() => {
    // 초기 더미 데이터 설정
    setAllNotifications({
      totalCount: dummyNotifications.length,
      unreadCount: dummyNotifications.filter((n) => !n.isRead).length,
      urgentCount: dummyNotifications.filter((n) => n.isUrgent).length,
      notifications: dummyNotifications,
    });

    setUrgentNotifications({
      totalCount: dummyNotifications.filter((n) => n.isUrgent).length,
      notifications: dummyNotifications.filter((n) => n.isUrgent),
    });

    setUnreadNotifications({
      totalCount: dummyNotifications.filter((n) => !n.isRead).length,
      notifications: dummyNotifications.filter((n) => !n.isRead),
    });

    // 실제 API 호출 시도
    fetchAllNotifications();
  }, [fetchAllNotifications, dummyNotifications]);

  return {
    // 데이터 상태
    allNotifications,
    urgentNotifications,
    unreadNotifications,

    // 로딩 상태
    isLoading,
    isAllLoading,
    isUrgentLoading,
    isUnreadLoading,

    // 에러 상태
    error,

    // 액션 함수들
    fetchAllNotifications,
    fetchUrgentNotifications,
    fetchUnreadNotifications,
    handleMarkAllRead,
    handleMarkRead,

    // 유틸리티 함수들
    getNotificationCount,
    getUnreadCount,
    getUrgentCount,
  };
};
