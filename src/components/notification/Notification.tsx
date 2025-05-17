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

const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='rounded-full p-3 hover:bg-white/20 transition-all duration-300 inline-block cursor-pointer'>
          <BellIcon className='text-white' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-[480px] h-[695px] translate-y-[10px] translate-x-[-10px] max-h-[70vh] overflow-y-auto'>
        <NotificationHeader />
        <Tabs
          defaultValue='all'
          className=' py-2'>
          <NotificationFilter />
          <NotificationContent />
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
