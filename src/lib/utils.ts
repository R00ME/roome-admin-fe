import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 알림용 날짜 포맷 함수 (ex: 방금 전, 3시간 전, 어제, MM월 dd일)
 */
export function formatNotificationDate(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) {
      return '방금 전';
    } else if (diffMin < 60) {
      return `${diffMin}분 전`;
    } else if (diffHour < 24) {
      return `${diffHour}시간 전`;
    } else if (diffDay === 1) {
      return '어제';
    } else {
      // MM월 dd일 포맷
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month.toString().padStart(2, '0')}월 ${day
        .toString()
        .padStart(2, '0')}일`;
    }
  } catch (error) {
    console.error('Date formatting error:', error, 'timestamp:', timestamp);
    return '날짜 오류';
  }
}
