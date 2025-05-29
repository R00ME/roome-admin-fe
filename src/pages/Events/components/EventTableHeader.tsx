import EventIcon from '@/assets/icons/sidebar/event-icon.svg?react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EventTableHeader = () => {
  return (
    <div className='flex items-center justify-between gap-2 mb-6'>
      <div className='flex items-center gap-2'>
        <EventIcon className='w-6 h-6 text-blue-500' />
        <h2 className='text-2xl font-semibold text-blue-500'>이벤트 목록</h2>
      </div>

      <Tabs
        defaultValue='name'
        className=' py-2'>
        <TabsList>
          <TabsTrigger value='name'>이름순</TabsTrigger>
          <TabsTrigger value='date'>가입순</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default EventTableHeader;
