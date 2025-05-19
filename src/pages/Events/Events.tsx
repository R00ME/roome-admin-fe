import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import EventTableFooter from './components/EventTableFooter';
import EventTableHeader from './components/EventTableHeader';
import EventTable from './components/EventTable';
import EventModal from './components/EventModal';

const data: EventItem[] = [
  {
    id: '1',
    title: '2025년 새로운 방꾸로 돌아왔습니다',
    target: '전체',
    uploadTime: '오늘, PM 04:20',
    status: '접속중',
    message: '2025 출시기념 오픈 이벤트에 여러분을 초대합니다',
    browser: 'chrome',
    createdAt: '2025-04-24, 09:22 AM',
    author: '김광구',
  },
];

const columns: ColumnDef<EventItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='전체 선택'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='행 선택'
      />
    ),
    size: 32,
  },
  {
    accessorKey: 'title',
    header: '이벤트 제목명',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'target',
    header: '수신대상',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'uploadTime',
    header: '업로드 예정일시',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'status',
    header: '업로드 상태',
    cell: (info) => (
      <span
        className={
          (info.getValue() === '접속중'
            ? 'bg-[#E6F4FF] text-[#3BA3FF]'
            : 'bg-[#F5F5F5] text-[#BDBDBD]') +
          ' px-3 py-1 rounded-full text-xs font-semibold'
        }>
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'message',
    header: '이벤트 메시지',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'browser',
    header: '첨부파일 여부',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: '작성일/시간',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'author',
    header: '작성자',
    cell: (info) => <span>{info.getValue() as string}</span>,
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
      <EventTableHeader />
      <EventTable table={table} />
      <EventTableFooter onAddEvent={() => setOpen(true)} />
      <EventModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Events;
