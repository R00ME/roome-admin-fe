import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Table, TableFooter, TableHeader } from '@/components/table';
import AdminModal from './components/AdminModal';
import AdminIcon from '@/assets/icons/sidebar/admin-invite-icon.svg?react';
import AdminRoleCell from '@/components/table/cells/AdminRoleCell';
import UrlCell from '@/components/table/cells/UrlCell';
import DeleteCell from '@/components/table/cells/DeleteCell';

const data: AdminItem[] = [
  {
    id: '1',
    name: '고광희',
    email: 'test02@naver.com',
    role: '운영 관리자',
    url: 'https://www.room-e.com/1002',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
  {
    id: '2',
    name: '고광희',
    email: 'test02@naver.com',
    role: '시스템 관리자',
    url: 'https://www.room-e.com/1002',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
  {
    id: '3',
    name: '고광희',
    email: 'test02@naver.com',
    role: '시스템 관리자',
    url: 'https://www.room-e.com/1002',
    accessTime: '오늘, PM 04:20',
    createdAt: '2025-04-24',
  },
];

const columns: ColumnDef<AdminItem>[] = [
  {
    accessorKey: 'name',
    header: '관리자명',
  },
  {
    accessorKey: 'email',
    header: 'ID/이메일',
  },
  {
    accessorKey: 'role',
    header: '관리자 등급',
    cell: ({ getValue }) => <AdminRoleCell role={getValue<AdminRole>()} />,
  },
  {
    accessorKey: 'url',
    header: '가장 많이 접속한 기능 (url)',
    cell: ({ getValue }) => <UrlCell url={getValue<string>()} />,
  },
  {
    accessorKey: 'accessTime',
    header: '마지막 접속 시간',
  },
  {
    accessorKey: 'createdAt',
    header: '최초 가입일',
  },
  {
    id: 'actions',
    cell: () => (
      <div className='flex justify-center'>
        <DeleteCell
          onClick={() => {
            // TODO: 삭제 로직 구현
            alert('삭제 기능은 추후 구현 예정');
          }}
        />
      </div>
    ),
  },
];

const Admins = () => {
  const [open, setOpen] = useState(false);

  const table = useReactTable<AdminItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      />
      <AdminModal
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default Admins;
