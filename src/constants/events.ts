import { ColumnDef } from '@tanstack/react-table';
import { EventItem } from '@/types/events';

export const EVENT_COLUMNS: ColumnDef<EventItem>[] = [
  {
    accessorKey: 'eventTitle',
    header: '이벤트 제목명',
  },
  {
    accessorKey: 'receiverTarget',
    header: '수신대상',
    cell: ({ getValue }) => {
      const target = getValue<string>();
      return target === 'ALL' ? '전체' : target;
    },
  },
  {
    accessorKey: 'uploadTime',
    header: '업로드 예정일시',
  },
  {
    accessorKey: 'status',
    header: '업로드 상태',
  },
  {
    accessorKey: 'eventMessage',
    header: '이벤트 메시지',
  },
  {
    accessorKey: 'createdAt',
    header: '작성일/시간',
  },
  {
    accessorKey: 'writer',
    header: '작성자',
  },
  {
    id: 'actions',
    header: '관리',
  },
];
