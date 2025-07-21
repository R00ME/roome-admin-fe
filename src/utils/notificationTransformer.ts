import { NotificationItem } from '@/types/notification';
import { NOTIFICATION_KEYS } from '@/constants/notification';

/**
 * API 응답에서 알림 배열을 추출하는 함수
 */
export const extractNotifications = (data: any): NotificationItem[] => {
  if (!data || typeof data === 'string') {
    return [];
  }

  // 더미 데이터 구조 처리 (notifications 필드가 있는 경우)
  if ('notifications' in data && Array.isArray(data.notifications)) {
    return data.notifications as NotificationItem[];
  }

  // API 응답 구조 처리 (날짜별 객체 구조)
  if (typeof data === 'object') {
    return Object.entries(data)
      .filter(([key]) => !Object.values(NOTIFICATION_KEYS).includes(key as any))
      .flatMap(([, notifications]) => {
        if (Array.isArray(notifications)) {
          return notifications as NotificationItem[];
        }
        return [];
      });
  }

  return [];
};

/**
 * 탭별 알림 데이터를 추출하는 함수
 */
export const getNotificationsByTab = (
  tab: string,
  allNotifications: any,
  urgentNotifications: any,
  unreadNotifications: any,
): NotificationItem[] => {
  switch (tab) {
    case 'all':
      return extractNotifications(allNotifications);
    case 'urgent':
      return extractNotifications(urgentNotifications);
    case 'unread':
      return extractNotifications(unreadNotifications);
    default:
      return [];
  }
};

/**
 * 카테고리별 로딩 상태를 반환하는 함수
 */
export const getLoadingStateByTab = (
  tab: string,
  isAllLoading: boolean,
  isUrgentLoading: boolean,
  isUnreadLoading: boolean,
): boolean => {
  switch (tab) {
    case 'all':
      return isAllLoading;
    case 'urgent':
      return isUrgentLoading;
    case 'unread':
      return isUnreadLoading;
    default:
      return false;
  }
};
