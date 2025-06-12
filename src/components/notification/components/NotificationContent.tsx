import { TabsContent } from '@/components/ui/tabs';
import { NOTIFICATION_TABS } from '@/constants/notification-tabinfo';
import { useQuery } from '@tanstack/react-query';

interface NotificationItem {
  id: string;
  type: string;
  content: string;
  createdAt: string;
}

interface NotificationResponse {
  items: NotificationItem[];
}

interface NotificationItemProps {
  type: string;
}

const NotificationItem = ({ type }: NotificationItemProps) => {
  const { data } = useQuery<NotificationResponse>({
    queryKey: ['notifications', type],
    queryFn: async () => {
      // TODO: 실제 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { items: [] };
    },
  });

  return (
    <div className='space-y-2'>
      {!data?.items.length ? (
        <div className='text-center py-4 text-gray-500'>알림이 없습니다</div>
      ) : (
        data.items.map((item) => (
          <div
            key={item.id}
            className='p-4 border-b'>
            {/* TODO: 실제 알림 아이템 UI 구현 */}
            {item.content}
          </div>
        ))
      )}
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
