import {
  NotificationListResponse,
  UrgentNotificationListResponse,
  UnreadNotificationListResponse,
  MarkAllReadResponse,
  MarkReadResponse,
} from '@/types/notification';

// Mock 알림 데이터 생성 함수
const createMockNotification = (
  id: number,
  category: 'EVENT' | 'SYSTEM' | 'CICD' | 'USER' | 'ETC',
  message: string,
  isRead: boolean = false,
  isUrgent: boolean = false,
) => ({
  notificationId: id,
  category,
  message,
  timestamp: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
  ).toISOString(),
  isRead,
  isUrgent,
});

// 전체 알림 목록 Mock 데이터
export const mockNotificationList: NotificationListResponse = {
  totalCount: 15,
  unreadCount: 8,
  urgentCount: 3,
  '2024-01-15': [
    createMockNotification(
      1,
      'SYSTEM',
      '시스템 점검이 완료되었습니다.',
      true,
      false,
    ),
    createMockNotification(
      2,
      'EVENT',
      '새로운 이벤트가 등록되었습니다.',
      false,
      true,
    ),
    createMockNotification(
      3,
      'USER',
      '새로운 사용자가 가입했습니다.',
      false,
      false,
    ),
  ],
  '2024-01-14': [
    createMockNotification(
      4,
      'CICD',
      '배포가 성공적으로 완료되었습니다.',
      true,
      false,
    ),
    createMockNotification(
      5,
      'SYSTEM',
      '서버 리소스 사용량이 높습니다.',
      false,
      true,
    ),
    createMockNotification(
      6,
      'EVENT',
      '이벤트 등록 마감일이 다가왔습니다.',
      false,
      false,
    ),
    createMockNotification(
      7,
      'USER',
      '사용자 문의가 접수되었습니다.',
      false,
      false,
    ),
  ],
  '2024-01-13': [
    createMockNotification(
      8,
      'SYSTEM',
      '데이터베이스 백업이 완료되었습니다.',
      true,
      false,
    ),
    createMockNotification(
      9,
      'EVENT',
      '이벤트 참여자가 증가했습니다.',
      false,
      false,
    ),
    createMockNotification(
      10,
      'CICD',
      '코드 리뷰가 요청되었습니다.',
      false,
      false,
    ),
  ],
  '2024-01-12': [
    createMockNotification(
      11,
      'SYSTEM',
      '보안 업데이트가 적용되었습니다.',
      true,
      false,
    ),
    createMockNotification(
      12,
      'USER',
      '사용자 계정이 비활성화되었습니다.',
      false,
      true,
    ),
    createMockNotification(
      13,
      'EVENT',
      '이벤트 등록이 시작되었습니다.',
      false,
      false,
    ),
  ],
  '2024-01-11': [
    createMockNotification(
      14,
      'ETC',
      '일반 공지사항이 등록되었습니다.',
      true,
      false,
    ),
    createMockNotification(
      15,
      'SYSTEM',
      '모니터링 알림이 발생했습니다.',
      false,
      false,
    ),
  ],
};

// 긴급 알림 목록 Mock 데이터
export const mockUrgentNotificationList: UrgentNotificationListResponse = {
  totalCount: 3,
  '2024-01-15': [
    createMockNotification(
      2,
      'EVENT',
      '새로운 이벤트가 등록되었습니다.',
      false,
      true,
    ),
  ],
  '2024-01-14': [
    createMockNotification(
      5,
      'SYSTEM',
      '서버 리소스 사용량이 높습니다.',
      false,
      true,
    ),
  ],
  '2024-01-12': [
    createMockNotification(
      12,
      'USER',
      '사용자 계정이 비활성화되었습니다.',
      false,
      true,
    ),
  ],
};

// 안읽은 알림 목록 Mock 데이터
export const mockUnreadNotificationList: UnreadNotificationListResponse = {
  totalCount: 8,
  '2024-01-15': [
    createMockNotification(
      2,
      'EVENT',
      '새로운 이벤트가 등록되었습니다.',
      false,
      true,
    ),
    createMockNotification(
      3,
      'USER',
      '새로운 사용자가 가입했습니다.',
      false,
      false,
    ),
  ],
  '2024-01-14': [
    createMockNotification(
      5,
      'SYSTEM',
      '서버 리소스 사용량이 높습니다.',
      false,
      true,
    ),
    createMockNotification(
      6,
      'EVENT',
      '이벤트 등록 마감일이 다가왔습니다.',
      false,
      false,
    ),
    createMockNotification(
      7,
      'USER',
      '사용자 문의가 접수되었습니다.',
      false,
      false,
    ),
  ],
  '2024-01-13': [
    createMockNotification(
      9,
      'EVENT',
      '이벤트 참여자가 증가했습니다.',
      false,
      false,
    ),
    createMockNotification(
      10,
      'CICD',
      '코드 리뷰가 요청되었습니다.',
      false,
      false,
    ),
  ],
  '2024-01-12': [
    createMockNotification(
      12,
      'USER',
      '사용자 계정이 비활성화되었습니다.',
      false,
      true,
    ),
    createMockNotification(
      13,
      'EVENT',
      '이벤트 등록이 시작되었습니다.',
      false,
      false,
    ),
  ],
};

// Mock 응답 데이터
export const mockMarkAllReadResponse: MarkAllReadResponse = {
  message: '모든 알림이 읽음 처리되었습니다.',
};

export const mockMarkReadResponse: MarkReadResponse = {
  message: '알림이 읽음 처리되었습니다.',
};
