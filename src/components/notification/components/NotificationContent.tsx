import { TabsContent } from '@/components/ui/tabs';
import { NOTIFICATION_TABS } from '@/constants/notification-tabinfo';

interface NotificationItemProps {
  type: string;
}

const NotificationItem = ({ type }: NotificationItemProps) => {
  return (
    <div className='space-y-2'>
      {/* 여기에 각 탭에 해당하는 알림 아이템 컴포넌트를 구현하시면 됩니다 */}
      {type} 알림 목록
    </div>
  );
};

const NotificationContent = () => {
  return (
    <>
      {NOTIFICATION_TABS.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className='mt-4'>
          <NotificationItem type={tab.value} />
        </TabsContent>
      ))}
    </>
  );
};

export default NotificationContent;
