import { TabsContent } from '@/components/ui/tabs';
import { NotificationItem } from '@/types/notification';
import NotificationList from './NotificationList';

interface UnreadNotificationsTabProps {
  notifications: NotificationItem[];
  onMarkRead: (notificationId: number) => void;
  isLoading: boolean;
  isActive: boolean;
}

const UnreadNotificationsTab = ({
  notifications,
  onMarkRead,
  isLoading,
  isActive,
}: UnreadNotificationsTabProps) => {
  if (!isActive) return null;

  return (
    <TabsContent
      value='unread'
      className='mt-4 flex-1 min-h-0 overflow-hidden'>
      <NotificationList
        notifications={notifications}
        onMarkRead={onMarkRead}
        isLoading={isLoading}
      />
    </TabsContent>
  );
};

export default UnreadNotificationsTab;
