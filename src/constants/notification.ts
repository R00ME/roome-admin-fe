export const NOTIFICATION_KEYS = {
  TOTAL_COUNT: 'totalCount',
  UNREAD_COUNT: 'unreadCount',
  URGENT_COUNT: 'urgentCount',
} as const;

export const NOTIFICATION_TABS = {
  ALL: 'all',
  URGENT: 'urgent',
  UNREAD: 'unread',
} as const;

export const NOTIFICATION_CATEGORIES = {
  EVENT: 'EVENT',
  SYSTEM: 'SYSTEM',
  CICD: 'CICD',
  USER: 'USER',
  ETC: 'ETC',
} as const;

export const CATEGORY_LABELS = {
  [NOTIFICATION_CATEGORIES.EVENT]: '이벤트',
  [NOTIFICATION_CATEGORIES.SYSTEM]: '시스템',
  [NOTIFICATION_CATEGORIES.CICD]: '배포',
  [NOTIFICATION_CATEGORIES.USER]: '사용자',
  [NOTIFICATION_CATEGORIES.ETC]: '기타',
} as const;

export const CATEGORY_COLORS = {
  [NOTIFICATION_CATEGORIES.EVENT]: 'bg-blue-100 text-blue-800',
  [NOTIFICATION_CATEGORIES.SYSTEM]: 'bg-orange-100 text-orange-800',
  [NOTIFICATION_CATEGORIES.CICD]: 'bg-green-100 text-green-800',
  [NOTIFICATION_CATEGORIES.USER]: 'bg-purple-100 text-purple-800',
  [NOTIFICATION_CATEGORIES.ETC]: 'bg-gray-100 text-gray-800',
} as const;
