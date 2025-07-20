import { NotificationItem as NotificationItemType } from '@/types/notification';
import { formatNotificationDate } from '@/lib/utils';

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
    switch (category) {
      case 'EVENT':
        return '이벤트';
      case 'SYSTEM':
        return '시스템';
      case 'CICD':
        return '배포';
      case 'USER':
        return '사용자';
      case 'ETC':
        return '기타';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'EVENT':
        return 'bg-blue-100 text-blue-800';
      case 'SYSTEM':
        return 'bg-orange-100 text-orange-800';
      case 'CICD':
        return 'bg-green-100 text-green-800';
      case 'USER':
        return 'bg-purple-100 text-purple-800';
      case 'ETC':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = formatNotificationDate;

  return (
    <div
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        !notification.isRead ? 'bg-blue-50' : ''
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
            {formatDate(notification.timestamp)}
          </p>
        </div>
        {!notification.isRead && (
          <button
            onClick={() => onMarkRead(notification.notificationId)}
            disabled={isLoading}
            className='text-xs text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed'>
            읽음
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItemComponent;
