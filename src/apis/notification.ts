import axiosInstance from './axiosInstance';
import {
  NotificationListResponse,
  UrgentNotificationListResponse,
  UnreadNotificationListResponse,
  MarkAllReadRequest,
  MarkAllReadResponse,
  MarkReadResponse,
} from '@/types/notification';

/**
 * 알림 전체 읽음 처리
 * @param {MarkAllReadRequest} data - 관리자 ID가 포함된 요청 객체
 * @returns {Promise<MarkAllReadResponse>} 처리 결과 메시지
 */
export const markAllNotificationsRead = async (
  data: MarkAllReadRequest,
): Promise<MarkAllReadResponse> => {
  const res = await axiosInstance.put<MarkAllReadResponse>(
    '/admin/notification/allread',
    data,
  );
  return res.data;
};

/**
 * 안읽은 알림 목록 조회
 * @returns {Promise<UnreadNotificationListResponse>} 날짜별 안읽은 알림 목록
 */
export const getUnreadNotifications =
  async (): Promise<UnreadNotificationListResponse> => {
    const res = await axiosInstance.get<UnreadNotificationListResponse>(
      '/admin/notification/unread',
    );
    return res.data;
  };

/**
 * 개별 알림 읽음 처리
 * @param {number} notificationId - 읽음 처리할 알림의 ID
 * @returns {Promise<MarkReadResponse>} 처리 결과 메시지
 */
export const markNotificationRead = async (
  notificationId: number,
): Promise<MarkReadResponse> => {
  const res = await axiosInstance.patch<MarkReadResponse>(
    `/admin/notification/${notificationId}/read`,
  );
  return res.data;
};

/**
 * 긴급 알림 목록 조회
 * @returns {Promise<UrgentNotificationListResponse>} 날짜별 긴급 알림 목록
 */
export const getUrgentNotifications =
  async (): Promise<UrgentNotificationListResponse> => {
    const res = await axiosInstance.get<UrgentNotificationListResponse>(
      '/admin/notification/urgent',
    );
    return res.data;
  };

/**
 * 알림 전체 조회
 * @returns {Promise<NotificationListResponse>} 날짜별 전체 알림 목록 및 카운트
 */
export const getAllNotifications =
  async (): Promise<NotificationListResponse> => {
    const res = await axiosInstance.get<NotificationListResponse>(
      '/admin/notification',
    );
    return res.data;
  };
