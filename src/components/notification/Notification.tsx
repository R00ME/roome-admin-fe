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
} from '@/hooks/notification/useNotificationRefactored';
import { useUserStore } from '@/store/useUserStore';
import { Badge } from '@/components/ui/badge';
import { useNotificationSSE } from '@/hooks/notification/useNotificationSSE';

const Notification = () => {
  const [activeTab, setActiveTab] = useState<NotificationTab>('all');
  const { user } = useUserStore();
  const { handleMarkAllRead, refreshAllData, isActionLoading, getUnreadCount } =
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

  // 읽지 않은 알림 개수
  const unreadCount = getUnreadCount();
  const displayCount = unreadCount > 99 ? '99+' : unreadCount.toString();

  // SSE 연결
  const { isConnected } = useNotificationSSE();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='rounded-full hover:bg-[#4983EF]/10 p-1.5 transition-all duration-300 inline-block cursor-pointer relative'>
          <BellIcon
            className={`transition-colors duration-300 ${
              isConnected ? 'text-blue-400' : 'text-white'
            }`}
          />
          {/* 읽지 않은 알림 개수 뱃지 */}
          {unreadCount > 0 && (
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs font-medium flex items-center justify-center'>
              {displayCount}
            </Badge>
          )}
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
            className='py-3 flex-1 flex flex-col min-h-0'>
            <NotificationFilter
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onMarkAllRead={handleMarkAllReadClick}
              isLoading={isActionLoading}
            />
            <NotificationErrorBoundary>
              <div className='flex-1 overflow-y-auto overflow-x-hidden min-h-0'>
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
