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
import { useNotification } from '@/hooks/useNotification';

const Notification = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'urgent'>(
    'all',
  );
  const { handleMarkAllRead, fetchAllNotifications, isLoading } =
    useNotification();

  const handleRefresh = () => {
    fetchAllNotifications();
  };

  const handleTabChange = (tab: 'all' | 'unread' | 'urgent') => {
    setActiveTab(tab);
  };

  const handleMarkAllReadClick = () => {
    handleMarkAllRead(1); // TODO: 실제 adminId로 변경
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='rounded-full p-3 hover:bg-white/20 transition-all duration-300 inline-block cursor-pointer'>
          <BellIcon className='text-white' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[480px] max-h-[70vh] translate-y-[10px] translate-x-[-10px] overflow-hidden'>
        <div className='h-full flex flex-col'>
          <NotificationHeader
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
          <Tabs
            defaultValue='all'
            className='py-2 flex-1 flex flex-col'>
            <NotificationFilter
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onMarkAllRead={handleMarkAllReadClick}
              isLoading={isLoading}
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
