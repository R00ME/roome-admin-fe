import { NotificationItem } from '@/types/notification';
import NotificationItemComponent from './NotificationItem';

interface NotificationDateGroupProps {
  date: string;
  notifications: NotificationItem[];
  onMarkRead: (notificationId: number) => void;
  isLoading?: boolean;
}

const NotificationDateGroup = ({
  date,
  notifications,
  onMarkRead,
  isLoading,
}: NotificationDateGroupProps) => {
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 날짜 비교를 위해 시간 제거
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );
    const yesterdayOnly = new Date(
      yesterday.getFullYear(),
      yesterday.getMonth(),
      yesterday.getDate(),
    );

    if (dateOnly.getTime() === todayOnly.getTime()) {
      return '오늘';
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return '어제';
    } else {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      });
    }
  };

  return (
    <div className='mb-6'>
      {/* 날짜 헤더 */}
      <div className='sticky top-0 bg-white z-10 py-2 mb-3'>
        <h3 className='text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2'>
          {formatDate(date)}
        </h3>
      </div>

      {/* 해당 날짜의 알림 목록 */}
      <div className='space-y-2'>
        {notifications.map((notification) => (
          <NotificationItemComponent
            key={notification.notificationId}
            notification={notification}
            onMarkRead={onMarkRead}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationDateGroup;
