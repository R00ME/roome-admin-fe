import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Table, TableFooter, TableHeader } from '@/components/table';
import EventModal from '@/pages/events/components/EventModal';
import EventIcon from '@/assets/icons/sidebar/event-icon.svg?react';

import { cn } from '@/lib/utils';

const data: EventItem[] = [
  {
    id: '1',
    title: '2025년 새로운 방꾸로 돌아왔습니다',
    target: '전체',
    uploadTime: '오늘, PM 04:20',
    status: '대기중',
    message: '2025 출시기념 오픈 이벤트에 여러분을 초대합니다',
    browser: 'chrome',
    createdAt: '2025-04-24, 09:22 AM',
    author: '김광구',
  },
];

const columns: ColumnDef<EventItem>[] = [
  {
    accessorKey: 'title',
    header: '이벤트 제목명',
  },
  {
    accessorKey: 'target',
    header: '수신대상',
  },
  {
    accessorKey: 'uploadTime',
    header: '업로드 예정일시',
  },
  {
    accessorKey: 'status',
    header: '업로드 상태',
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return (
        <span
          className={cn(
            status === '대기중'
              ? 'bg-[#E6F4FF] text-[#3BA3FF]'
              : 'bg-[#F5F5F5] text-[#BDBDBD]',
            'px-3 py-1 rounded-full text-xs font-semibold user-select-none',
          )}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: 'message',
    header: '이벤트 메시지',
  },
  {
    accessorKey: 'browser',
    header: '첨부파일 여부',
  },
  {
    accessorKey: 'createdAt',
    header: '작성일/시간',
  },
  {
    accessorKey: 'author',
    header: '작성자',
  },
];

const Events = () => {
  const [open, setOpen] = useState(false);

  const table = useReactTable<EventItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <Table table={table} />
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
