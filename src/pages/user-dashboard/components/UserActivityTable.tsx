import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { UserActivityItem } from '../../../types/user-dashboard';
import { USER_ACTIVITY_COLUMNS } from '../../../constants/user-dashboard/userActivity';
import { Table } from '../../../components/table';

interface UserActivityTableProps {
  data: UserActivityItem[];
  isLoading: boolean;
  onRowClick?: (user: UserActivityItem) => void;
}

export default function UserActivityTable({
  data,
  isLoading,
  onRowClick,
}: UserActivityTableProps) {
  const table = useReactTable({
    data,
    columns: USER_ACTIVITY_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <Table
        table={table}
        isLoading={isLoading}
        onRowClick={onRowClick}
      />
    </>
  );
}
