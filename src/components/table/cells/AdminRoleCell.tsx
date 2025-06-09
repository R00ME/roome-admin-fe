import { memo } from 'react';
import { cn } from '@/lib/utils';

type AdminRole = '운영 관리자' | '시스템 관리자' | '일반 관리자';

const roleStyles: Record<AdminRole, string> = {
  '운영 관리자': 'bg-[#E6F4FF] text-[#3BA3FF]',
  '시스템 관리자': 'bg-[#F0E6FF] text-[#8B5CF6]',
  '일반 관리자': 'bg-[#F5F5F5] text-[#BDBDBD]',
} as const;

interface AdminRoleCellProps {
  role: AdminRole;
}

const AdminRoleCell = memo(({ role }: AdminRoleCellProps) => {
  return (
    <span
      className={cn(
        roleStyles[role],
        'px-3 py-1 rounded-full text-xs font-semibold user-select-none',
      )}>
      {role}
    </span>
  );
});

AdminRoleCell.displayName = 'AdminRoleCell';

export default AdminRoleCell;
