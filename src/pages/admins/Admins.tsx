import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Table, TableFooter, TableHeader } from '@/components/table';
import AdminModal from './components/AdminModal';
import AdminIcon from '@/assets/icons/sidebar/admin-invite-icon.svg?react';
import { fetchAdminList, inviteAdmin, deleteAdmin } from '@/apis/admins';
import type { AdminItem, AdminRole, AdminInviteRequest } from '@/types/admins';
import { useToast } from '@/hooks/useToast';

import AdminRoleCell from '@/components/table/cells/AdminRoleCell';
import DeleteCell from '@/components/table/cells/DeleteCell';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Admins = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AdminItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<AdminItem | null>(null);
  const { success, error: showError } = useToast();

  const handleDeleteClick = (admin: AdminItem) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!adminToDelete) return;

    try {
      await deleteAdmin(adminToDelete.id);
      success('운영자 권한이 삭제되었습니다.');
      // 목록 새로고침
      await fetchAdmins();
    } catch (error) {
      console.error('🚨 운영자 삭제 실패:', error);
      showError('운영자 삭제에 실패했습니다.');
    } finally {
      setDeleteDialogOpen(false);
      setAdminToDelete(null);
    }
  };

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
      cell: ({ row }) => (
        <div className='flex justify-center'>
          <DeleteCell onClick={() => handleDeleteClick(row.original)} />
        </div>
      ),
    },
  ];

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

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>운영자 권한 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              <span className='font-medium text-foreground'>
                {adminToDelete?.name}
              </span>
              &nbsp;운영자의 권한을 삭제하시겠습니까?
              <br />
              이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className='border border-red-400! bg-white text-red-400 hover:bg-red-400/10'>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admins;
