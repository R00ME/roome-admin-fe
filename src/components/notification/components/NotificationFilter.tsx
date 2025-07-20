import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NotificationTab, useNotification } from '@/hooks/useNotification';

interface NotificationFilterProps {
  activeTab: NotificationTab;
  onTabChange: (tab: NotificationTab) => void;
  onMarkAllRead: () => void;
  isLoading?: boolean;
}

const NotificationFilter = ({
  activeTab,
  onTabChange,
  onMarkAllRead,
  isLoading = false,
}: NotificationFilterProps) => {
  const { getNotificationCount, getUnreadCount, getUrgentCount } =
    useNotification();

  const tabs = [
    {
      value: 'all' as NotificationTab,
      label: '전체',
      count: getNotificationCount('all'),
      color: 'text-blue-400',
    },
    {
      value: 'unread' as NotificationTab,
      label: '안 읽은 목록',
      count: getUnreadCount(),
      color: 'text-gray-400',
    },
    {
      value: 'urgent' as NotificationTab,
      label: '긴급',
      count: getUrgentCount(),
      color: 'text-red-400',
    },
  ];

  return (
    <div className='flex items-center justify-between w-full'>
      <TabsList className='bg-transparent p-0'>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onClick={() => onTabChange(tab.value)}
            className='flex items-center gap-1 data-[state=active]:bg-blue-50 data-[state=active]:shadow-none rounded-lg px-3 py-1.5'>
            {tab.label}{' '}
            <span className={`text-xs ${tab.color}`}>{tab.count}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <button
        onClick={onMarkAllRead}
        disabled={isLoading || getUnreadCount() === 0}
        className='text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
        모두 읽음
      </button>
    </div>
  );
};

export default NotificationFilter;
