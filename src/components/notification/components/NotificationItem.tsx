import { NotificationItem as NotificationItemType } from '@/types/notification';
import { formatNotificationDate } from '@/lib/utils';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/constants/notification';

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkRead: (notificationId: number) => void;
  isLoading?: boolean;
}

const NotificationItemComponent = ({
  notification,
  onMarkRead,
  isLoading,
}: NotificationItemProps) => {
  const getCategoryLabel = (category: string) => {
    return (
      CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category
    );
  };

  const getCategoryColor = (category: string) => {
    return (
      CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
      'bg-gray-100 text-gray-800'
    );
  };

  return (
    <div
      className={`p-4 border-b rounded-lg border-gray-100 transition-colors ${
        !notification.isRead
          ? 'bg-gray-100  hover:bg-gray-100/70 cursor-pointer border border-gray-300'
          : 'bg-gray-50 border border-gray-200'
      }`}>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2'>
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                notification.category,
              )}`}>
              {getCategoryLabel(notification.category)}
            </span>
            {notification.isUrgent && (
              <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                긴급
              </span>
            )}
            {!notification.isRead && (
              <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                New
              </span>
            )}
          </div>
          <p className='text-sm text-gray-900 mb-2 line-clamp-2'>
            {notification.message}
          </p>
          <p className='text-xs text-gray-500'>
            {formatNotificationDate(notification.timestamp)}
          </p>
        </div>
        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification.notificationId)}
            disabled={isLoading}
            className='text-xs text-gray-500 bg-gray-200 rounded-md px-2 py-1 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            읽음
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItemComponent;
