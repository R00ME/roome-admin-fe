import { useNotificationData } from './useNotificationData';
import { useNotificationActions } from './useNotificationActions';
import {
  getNotificationsByTab,
  getLoadingStateByTab,
} from '@/utils/notificationTransformer';

export type NotificationTab = 'all' | 'urgent' | 'unread';

export const useNotificationRefactored = () => {
  const {
    allNotifications,
    urgentNotifications,
    unreadNotifications,
    isAllLoading,
    isUrgentLoading,
    isUnreadLoading,
    error,
    refreshAllData,
  } = useNotificationData();

  const {
    isLoading: isActionLoading,
    handleMarkRead,
    handleMarkAllRead,
  } = useNotificationActions();

  // 읽음 처리 후 데이터 새로고침을 포함한 핸들러
  const handleMarkReadWithRefresh = async (notificationId: number) => {
    await handleMarkRead(notificationId, refreshAllData);
  };

  const handleMarkAllReadWithRefresh = async (adminId: number) => {
    await handleMarkAllRead(adminId, refreshAllData);
  };

  // 탭별 데이터 조회
  const getNotificationsForTab = (tab: NotificationTab) => {
    return getNotificationsByTab(
      tab,
      allNotifications,
      urgentNotifications,
      unreadNotifications,
    );
  };

  // 탭별 로딩 상태 조회
  const getLoadingForTab = (tab: NotificationTab) => {
    return getLoadingStateByTab(
      tab,
      isAllLoading,
      isUrgentLoading,
      isUnreadLoading,
    );
  };

  // 카운트 조회 함수들
  const getNotificationCount = (tab: NotificationTab): number => {
    switch (tab) {
      case 'all':
        return allNotifications?.totalCount || 0;
      case 'unread':
        return unreadNotifications?.totalCount || 0;
      case 'urgent':
        return urgentNotifications?.totalCount || 0;
      default:
        return 0;
    }
  };

  const getUnreadCount = (): number => {
    return unreadNotifications?.totalCount || 0;
  };

  const getUrgentCount = (): number => {
    return urgentNotifications?.totalCount || 0;
  };

  return {
    // 원시 데이터
    allNotifications,
    urgentNotifications,
    unreadNotifications,

    // 로딩 상태
    isAllLoading,
    isUrgentLoading,
    isUnreadLoading,
    isActionLoading,

    // 에러 상태
    error,

    // 헬퍼 함수들
    getNotificationsForTab,
    getLoadingForTab,
    getNotificationCount,
    getUnreadCount,
    getUrgentCount,

    // 액션 함수들
    handleMarkRead: handleMarkReadWithRefresh,
    handleMarkAllRead: handleMarkAllReadWithRefresh,
    refreshAllData,
  };
};
