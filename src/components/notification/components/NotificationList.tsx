import { NotificationItem } from '@/types/notification';
import NotificationItemComponent from './NotificationItem';

interface NotificationListProps {
  notifications: NotificationItem[];
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
      <div className='space-y-2'>
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

  if (notifications.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>알림이 없습니다</p>
      </div>
    );
  }

  return (
    <div className='space-y-0 h-[400px] overflow-y-auto'>
      {notifications.map((notification) => (
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
