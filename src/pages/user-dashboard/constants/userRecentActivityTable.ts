import { ColumnDef } from "@tanstack/react-table";
import { UserActivityItem } from "../../../types/user-dashboard";

export const fmtDateTime = (iso?: string) =>
  iso ? iso.replace('T', ' ').slice(0, 16) : '—';

export const columns: ColumnDef<UserActivityItem>[] = [
  { header: '닉네임', accessorKey: 'nickname' },
  { header: '이메일', accessorKey: 'email' },
  {
    header: '마지막 접속 시간',
    accessorKey: 'lastLogin',
    cell: ({ getValue }) => fmtDateTime(getValue() as string | undefined),
  },
  // {
  //   header: '상태',
  //   accessorKey: 'status',
  //   cell: ({ getValue }) => String(getValue() ?? 'OFFLINE'),
  // },
  { header: '가장 많이 접속한 기능', accessorKey: 'mostUsedDomain' },
  {
    header: '최초 가입일',
    accessorKey: 'createdAt',
    cell: ({ getValue }) => fmtDateTime(getValue() as string | undefined),
  },
];
