import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs } from '@/components/ui/tabs';
import BellIcon from '@/assets/icons/header/bell-icon.svg?react';
import NotificationHeader from './components/NotificationHeader';
import NotificationFilter from './components/NotificationFilter';
import NotificationContent from './components/NotificationContent';
import NotificationSkeleton from './components/NotificationSkeleton';
import NotificationErrorBoundary from './components/NotificationErrorBoundary';
import { Suspense, useState } from 'react';
import {
  NotificationTab,
  useNotificationRefactored,
} from '@/hooks/useNotificationRefactored';
import { useUserStore } from '@/store/useUserStore';

const Notification = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const { user } = useUserStore();
  const { handleMarkAllRead, refreshAllData, isActionLoading } =
    useNotificationRefactored();

  const handleRefresh = () => {
    refreshAllData();
  };

  const handleTabChange = (tab: NotificationTab) => {
    setActiveTab(tab);
  };

  const handleMarkAllReadClick = () => {
    if (user?.adminId) {
      handleMarkAllRead(user.adminId);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='rounded-full hover:bg-[#4983EF]/10 p-1.5 transition-all duration-300 inline-block cursor-pointer'>
          <BellIcon className='text-white' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[480px] max-h-[70vh] translate-y-[10px] translate-x-[-10px] overflow-hidden'>
        <div className='h-full flex flex-col'>
          <NotificationHeader
            onRefresh={handleRefresh}
            isLoading={isActionLoading}
          />
          <Tabs
            defaultValue='all'
            className='py-2 flex-1 flex flex-col'>
            <NotificationFilter
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onMarkAllRead={handleMarkAllReadClick}
              isLoading={isActionLoading}
            />
            <NotificationErrorBoundary>
              <div className='flex-1 overflow-y-auto'>
                <Suspense fallback={<NotificationSkeleton />}>
                  <NotificationContent activeTab={activeTab} />
                </Suspense>
              </div>
            </NotificationErrorBoundary>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
