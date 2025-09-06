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
} from '@/types/notification';

export class NotificationService {
  /**
   * 전체 알림 조회
   */
  static async fetchAllNotifications(): Promise<NotificationListResponse> {
    try {
      const data = await getAllNotifications();
      if (data && typeof data === 'object') {
        return data;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.warn('전체 알림 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 긴급 알림 조회
   */
  static async fetchUrgentNotifications(): Promise<UrgentNotificationListResponse> {
    try {
      const data = await getUrgentNotifications();
      if (data && typeof data === 'object') {
        return data;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.warn('긴급 알림 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 안읽은 알림 조회
   */
  static async fetchUnreadNotifications(): Promise<UnreadNotificationListResponse> {
    try {
      const data = await getUnreadNotifications();
      if (data && typeof data === 'object') {
        return data;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.warn('안읽은 알림 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 개별 알림 읽음 처리
   */
  static async markAsRead(notificationId: number): Promise<void> {
    try {
      await markNotificationRead(notificationId);
    } catch (error) {
      console.warn('개별 읽음 처리 실패:', error);
      throw error;
    }
  }

  /**
   * 전체 알림 읽음 처리
   */
  static async markAllAsRead(adminId: number): Promise<void> {
    try {
      const requestData: MarkAllReadRequest = { adminId };
      await markAllNotificationsRead(requestData);
    } catch (error) {
      console.warn('전체 읽음 처리 실패:', error);
      throw error;
    }
  }
}
