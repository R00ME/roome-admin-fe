import { NotificationTab, useNotification } from '@/hooks/useNotification';
import { NotificationItem } from '@/types/notification';
import AllNotificationsTab from './AllNotificationsTab';
import UrgentNotificationsTab from './UrgentNotificationsTab';
import UnreadNotificationsTab from './UnreadNotificationsTab';

interface NotificationContentProps {
  activeTab: NotificationTab;
}

const NotificationContent = ({ activeTab }: NotificationContentProps) => {
  const {
    allNotifications,
    urgentNotifications,
    unreadNotifications,
    handleMarkRead,
    isLoading,
    isAllLoading,
    isUrgentLoading,
    isUnreadLoading,
  } = useNotification();

  const getNotificationsForTab = (tab: NotificationTab): NotificationItem[] => {
    switch (tab) {
      case 'all':
        if (!allNotifications || typeof allNotifications === 'string')
          return [];
        if (
          'notifications' in allNotifications &&
          Array.isArray(allNotifications.notifications)
        ) {
          return allNotifications.notifications as NotificationItem[];
        }
        if (typeof allNotifications === 'object') {
          return Object.entries(allNotifications)
            .filter(
              ([key]) =>
                key !== 'totalCount' &&
                key !== 'unreadCount' &&
                key !== 'urgentCount',
            )
            .flatMap(([, notifications]) => {
              if (Array.isArray(notifications)) {
                return notifications as NotificationItem[];
              }
              return [];
            });
        }
        return [];

      case 'urgent':
        if (!urgentNotifications || typeof urgentNotifications === 'string')
          return [];
        if (
          'notifications' in urgentNotifications &&
          Array.isArray(urgentNotifications.notifications)
        ) {
          return urgentNotifications.notifications as NotificationItem[];
        }
        if (typeof urgentNotifications === 'object') {
          return Object.entries(urgentNotifications)
            .filter(([key]) => key !== 'totalCount')
            .flatMap(([, notifications]) => {
              if (Array.isArray(notifications)) {
                return notifications as NotificationItem[];
              }
              return [];
            });
        }
        return [];

      case 'unread':
        if (!unreadNotifications || typeof unreadNotifications === 'string')
          return [];
        if (
          'notifications' in unreadNotifications &&
          Array.isArray(unreadNotifications.notifications)
        ) {
          return unreadNotifications.notifications as NotificationItem[];
        }
        if (typeof unreadNotifications === 'object') {
          return Object.entries(unreadNotifications)
            .filter(([key]) => key !== 'totalCount')
            .flatMap(([, notifications]) => {
              if (Array.isArray(notifications)) {
                return notifications as NotificationItem[];
              }
              return [];
            });
        }
        return [];

      default:
        return [];
    }
  };

  return (
    <>
      <AllNotificationsTab
        notifications={getNotificationsForTab('all')}
        onMarkRead={handleMarkRead}
        isLoading={isAllLoading || isLoading}
        isActive={activeTab === 'all'}
      />
      <UrgentNotificationsTab
        notifications={getNotificationsForTab('urgent')}
        onMarkRead={handleMarkRead}
        isLoading={isUrgentLoading || isLoading}
        isActive={activeTab === 'urgent'}
      />
      <UnreadNotificationsTab
        notifications={getNotificationsForTab('unread')}
        onMarkRead={handleMarkRead}
        isLoading={isUnreadLoading || isLoading}
        isActive={activeTab === 'unread'}
      />
    </>
  );
};

export default NotificationContent;
