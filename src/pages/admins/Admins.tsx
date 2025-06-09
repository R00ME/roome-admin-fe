import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableFooter, TableHeader } from '@/components/table';
import AdminModal from './components/AdminModal';
import AdminIcon from '@/assets/icons/sidebar/admin-invite-icon.svg?react';

interface AdminItem {
  id: string;
  name: string;
  email: string;
  role: string;
  url: string;
  status: string;
  accessTime: string;
  createdAt: string;
}

const data: AdminItem[] = [
  {
    id: '1',
    name: '고광희',
    email: 'test02@naver.com',
    role: '운영 관리자',
    url: 'https://www.room-e.com/1002',
    status: '접속중',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
  {
    id: '2',
    name: '고광희',
    email: 'test02@naver.com',
    role: '시스템 관리자',
    url: 'https://www.room-e.com/1002',
    status: '접속중',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
  {
    id: '3',
    name: '고광희',
    email: 'test02@naver.com',
    role: '시스템 관리자',
    url: 'https://www.room-e.com/1002',
    status: '접속중',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
];

const columns: ColumnDef<AdminItem>[] = [
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
    accessorKey: 'name',
    header: '관리자명',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'email',
    header: 'ID/이메일',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'role',
    header: '관리자 등급',
    cell: (info) => (
      <span
        className={
          (info.getValue() === '운영 관리자'
            ? 'bg-[#E6F4FF] text-[#3BA3FF]'
            : info.getValue() === '시스템 관리자'
            ? 'bg-[#F0E6FF] text-[#8B5CF6]'
            : 'bg-[#F5F5F5] text-[#BDBDBD]') +
          ' px-3 py-1 rounded-full text-xs font-semibold'
        }>
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: 'url',
    header: '가장 많이 접속한 기능 (url)',
    cell: (info) => (
      <span className='text-blue-500'>{info.getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'accessTime',
    header: '마지막 접속 시간',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'createdAt',
    header: '최초 가입일',
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
];

const Admins = () => {
  const [open, setOpen] = useState(false);

  const table = useReactTable<AdminItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className='w-full p-8'>
      <TableHeader
        icon={AdminIcon}
        title='운영자 목록'
        tabs={[
          { value: 'name', label: '이름순' },
          { value: 'date', label: '가입순' },
        ]}
        defaultTab='name'
      />
      <Table table={table} />
      <TableFooter
        onAddItem={() => setOpen(true)}
        buttonText='+ 운영자 초대'
        selectedCount={selectedRows.length}
        totalCount={data.length}
      />
      <AdminModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Admins;
