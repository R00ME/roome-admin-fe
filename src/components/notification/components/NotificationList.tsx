import {
  NotificationItem,
  NotificationListResponse,
} from '@/types/notification';
import NotificationDateGroup from './NotificationDateGroup';
import NotificationItemComponent from './NotificationItem';

interface NotificationListProps {
  notifications: NotificationItem[] | NotificationListResponse;
  onMarkRead: (notificationId: number) => void;
  isLoading?: boolean;
}

const NotificationList = ({
  notifications,
  onMarkRead,
  isLoading,
}: NotificationListProps) => {
  if (isLoading) {
    return (
      <div className='space-y-1'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='p-4 border-b border-gray-100 animate-pulse'>
            <div className='flex items-center gap-2 mb-2'>
              <div className='h-6 bg-gray-200 rounded-full w-16'></div>
              <div className='h-6 bg-gray-200 rounded-full w-12'></div>
            </div>
            <div className='h-4 bg-gray-200 rounded w-full mb-2'></div>
            <div className='h-3 bg-gray-200 rounded w-20'></div>
          </div>
        ))}
      </div>
    );
  }

  // 날짜별 그룹핑된 데이터인지 확인
  const isGroupedData =
    notifications &&
    typeof notifications === 'object' &&
    'totalCount' in notifications;

  if (isGroupedData) {
    const groupedNotifications = notifications as NotificationListResponse;
    const dateKeys = Object.keys(groupedNotifications).filter(
      (key) =>
        key !== 'totalCount' &&
        key !== 'unreadCount' &&
        key !== 'urgentCount' &&
        key !== 'notifications',
    );

    if (dateKeys.length === 0) {
      return (
        <div className='text-center py-8 text-gray-500'>
          <p>알림이 없습니다</p>
        </div>
      );
    }

    return (
      <div className='space-y-0 h-[400px] overflow-y-auto'>
        {dateKeys.map((date) => (
          <NotificationDateGroup
            key={date}
            date={date}
            notifications={groupedNotifications[date] as NotificationItem[]}
            onMarkRead={onMarkRead}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  }

  // 기존 배열 형태의 데이터 처리
  const notificationArray = notifications as NotificationItem[];

  if (notificationArray.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>알림이 없습니다</p>
      </div>
    );
  }

  return (
    <div className='space-y-0 h-[400px] overflow-y-auto'>
      {notificationArray.map((notification) => (
        <NotificationItemComponent
          key={notification.notificationId}
          notification={notification}
          onMarkRead={onMarkRead}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default NotificationList;
