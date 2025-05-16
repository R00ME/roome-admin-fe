import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NOTIFICATION_TABS } from '@/constants/notification-tabinfo';

const NotificationFilter = () => {
  return (
    <div className='flex items-center justify-between w-full'>
      <TabsList className='bg-transparent p-0'>
        {NOTIFICATION_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className='flex items-center gap-1 data-[state=active]:bg-blue-50 data-[state=active]:shadow-none rounded-lg px-3 py-1.5'>
            {tab.label}{' '}
            <span className={`text-xs ${tab.color}`}>{tab.count}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <button className='text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer'>
        모두 읽음
      </button>
    </div>
  );
};

export default NotificationFilter;
