// 알림 카테고리
export type NotificationCategory = 'EVENT' | 'SYSTEM' | 'CICD' | 'USER' | 'ETC';

// 단일 알림 객체
export interface NotificationItem {
  notificationId: number;
  category: NotificationCategory;
  message: string;
  timestamp: string; // ISO8601
  isRead: boolean;
  isUrgent: boolean;
}

// 전체 알림 목록 응답
export interface NotificationListResponse {
  totalCount: number;
  unreadCount: number;
  urgentCount: number;
  [date: string]: NotificationItem[] | number; // 날짜별 알림 배열 또는 카운트
}

// 긴급 알림 목록 응답
export interface UrgentNotificationListResponse {
  totalCount: number;
  [date: string]: NotificationItem[] | number;
}

// 안읽은 알림 목록 응답
export interface UnreadNotificationListResponse {
  totalCount: number;
  [date: string]: NotificationItem[] | number;
}

// 알림 전체 읽음 처리 요청
export interface MarkAllReadRequest {
  adminId: number;
}

// 알림 전체 읽음 처리 응답
export interface MarkAllReadResponse {
  message: string;
}

// 개별 알림 읽음 처리 응답
export interface MarkReadResponse {
  message: string;
}
