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
  NotificationCategory,
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
      return this.getFallbackAllNotifications();
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
      return this.getFallbackUrgentNotifications();
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
      return this.getFallbackUnreadNotifications();
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

  /**
   * 더미 데이터 - 전체 알림
   */
  private static getFallbackAllNotifications(): NotificationListResponse {
    const notifications = this.createDummyNotifications();
    return {
      totalCount: notifications.length,
      unreadCount: notifications.filter((n) => !n.isRead).length,
      urgentCount: notifications.filter((n) => n.isUrgent).length,
      notifications,
    };
  }

  /**
   * 더미 데이터 - 긴급 알림
   */
  private static getFallbackUrgentNotifications(): UrgentNotificationListResponse {
    const notifications = this.createDummyNotifications().filter(
      (n) => n.isUrgent,
    );
    return {
      totalCount: notifications.length,
      notifications,
    };
  }

  /**
   * 더미 데이터 - 안읽은 알림
   */
  private static getFallbackUnreadNotifications(): UnreadNotificationListResponse {
    const notifications = this.createDummyNotifications().filter(
      (n) => !n.isRead,
    );
    return {
      totalCount: notifications.length,
      notifications,
    };
  }

  /**
   * 더미 알림 데이터 생성
   */
  private static createDummyNotifications() {
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
  }
}
