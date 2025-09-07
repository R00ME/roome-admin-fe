import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Table, TableFooter, TableHeader } from '@/components/table';
import EventModal from '@/pages/events/components/EventModal';
import EventIcon from '@/assets/icons/sidebar/event-icon.svg?react';
import { EVENT_COLUMNS } from '@/constants/events';
import { getEventList } from '@/apis/events';
import { EventItem, EventListResponse } from '@/types/events';

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<EventItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  // URL에서 페이지 파라미터 파싱
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const table = useReactTable({
    data: data,
    columns: EVENT_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchEvents = async (page: number) => {
    try {
      setIsLoading(true);
      const response: EventListResponse = await getEventList({
        page,
        pagesize: pageSize,
      });

      setData(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('이벤트 목록 조회 실패:', error);
      setData([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    // URL 업데이트
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className='w-full'>
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
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onAddItem={() => setOpen(true)}
        buttonText='+ 새 이벤트 추가하기'
        isLoading={isLoading}
      />
      <EventModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Events;
