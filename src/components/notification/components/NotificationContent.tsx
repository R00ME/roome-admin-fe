import {
  NotificationTab,
  useNotificationRefactored,
} from '@/hooks/notification/useNotificationRefactored';
import AllNotificationsTab from './AllNotificationsTab';
import UrgentNotificationsTab from './UrgentNotificationsTab';
import UnreadNotificationsTab from './UnreadNotificationsTab';

interface NotificationContentProps {
  activeTab: NotificationTab;
}

const NotificationContent = ({ activeTab }: NotificationContentProps) => {
  const {
    getNotificationsForTab,
    getLoadingForTab,
    handleMarkRead,
    isActionLoading,
  } = useNotificationRefactored();

  return (
    <>
      <AllNotificationsTab
        notifications={getNotificationsForTab('all')}
        onMarkRead={handleMarkRead}
        isLoading={getLoadingForTab('all') || isActionLoading}
        isActive={activeTab === 'all'}
      />
      <UrgentNotificationsTab
        notifications={getNotificationsForTab('urgent')}
        onMarkRead={handleMarkRead}
        isLoading={getLoadingForTab('urgent') || isActionLoading}
        isActive={activeTab === 'urgent'}
      />
      <UnreadNotificationsTab
        notifications={getNotificationsForTab('unread')}
        onMarkRead={handleMarkRead}
        isLoading={getLoadingForTab('unread') || isActionLoading}
        isActive={activeTab === 'unread'}
      />
    </>
  );
};

export default NotificationContent;
