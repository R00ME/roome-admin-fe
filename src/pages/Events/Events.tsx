import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Table, TableFooter, TableHeader } from '@/components/table';
import EventModal from '@/pages/events/components/EventModal';
import EventIcon from '@/assets/icons/sidebar/event-icon.svg?react';
import { EVENT_COLUMNS, MOCK_EVENT_DATA } from '@/constants/events';

const Events = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EventItem[]>([]);

  const table = useReactTable({
    data: data,
    columns: EVENT_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        // 2초 후에 데이터를 로드하도록 시뮬레이션
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setData(MOCK_EVENT_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className='w-full p-8'>
      <TableHeader
        icon={EventIcon}
        title='이벤트 목록'
        tabs={[
          { value: 'name', label: '이름순' },
          { value: 'date', label: '가입순' },
        ]}
        defaultTab='name'
      />
      <Table
        table={table}
        isLoading={isLoading}
      />
      <TableFooter
        onAddItem={() => setOpen(true)}
        buttonText='+ 새 이벤트 추가하기'
      />
      <EventModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Events;
