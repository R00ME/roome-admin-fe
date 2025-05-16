export interface TabInfo {
  value: string;
  label: string;
  count: number;
  color: string;
}

export const NOTIFICATION_TABS: TabInfo[] = [
  { value: 'all', label: '전체', count: 16, color: 'text-blue-400' },
  { value: 'unread', label: '안 읽은 목록', count: 12, color: 'text-gray-400' },
  { value: 'urgent', label: '긴급', count: 4, color: 'text-red-400' },
];
