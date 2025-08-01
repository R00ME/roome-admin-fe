import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Table, TableFooter, TableHeader } from '@/components/table';
import AdminModal from './components/AdminModal';
import AdminIcon from '@/assets/icons/sidebar/admin-invite-icon.svg?react';
import { fetchAdminList, inviteAdmin } from '@/apis/admins';
import type { AdminItem, AdminRole, AdminInviteRequest } from '@/types/admins';
import { useToast } from '@/hooks/useToast';

import AdminRoleCell from '@/components/table/cells/AdminRoleCell';
import DeleteCell from '@/components/table/cells/DeleteCell';

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
    id: 'actions',
    header: '관리',
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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AdminItem[]>([]);
  const { success, error: showError } = useToast();

  const table = useReactTable<AdminItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAdminList();
      setData(response.content);
    } catch (error) {
      console.error('🚨 운영자 목록 조회 실패:', error);
      showError('운영자 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteAdmin = async (inviteData: AdminInviteRequest) => {
    try {
      await inviteAdmin(inviteData);
      success('운영자 초대가 완료되었습니다.');
      setOpen(false);
      // 목록 새로고침
      await fetchAdmins();
    } catch (error) {
      console.error('🚨 운영자 초대 실패:', error);
      showError('운영자 초대에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className='w-full'>
      <TableHeader
        icon={AdminIcon}
        title='운영자 목록'
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
        buttonText='+ 운영자 초대'
      />
      <AdminModal
        open={open}
        onOpenChange={setOpen}
        onInvite={handleInviteAdmin}
      />
    </div>
  );
};

export default Admins;
