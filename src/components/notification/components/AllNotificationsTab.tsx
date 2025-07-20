import { TabsContent } from '@/components/ui/tabs';
import { NotificationItem } from '@/types/notification';
import NotificationList from './NotificationList';

interface AllNotificationsTabProps {
  notifications: NotificationItem[];
  onMarkRead: (notificationId: number) => void;
  isLoading: boolean;
  isActive: boolean;
}

const AllNotificationsTab = ({
  notifications,
  onMarkRead,
  isLoading,
  isActive,
}: AllNotificationsTabProps) => {
  if (!isActive) return null;

  return (
    <TabsContent
      value='all'
      className='mt-4'>
      <NotificationList
        notifications={notifications}
        onMarkRead={onMarkRead}
        isLoading={isLoading}
      />
    </TabsContent>
  );
};

export default AllNotificationsTab;
