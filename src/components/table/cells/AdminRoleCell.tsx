import type { AdminRoleCellProps } from '@/types/admins';

const AdminRoleCell = ({ role }: AdminRoleCellProps) => {
  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return '최고 관리자';
      case 'SYSTEM_MANAGER':
        return '시스템 관리자';
      case 'OPERATION_MANAGER':
        return '운영 관리자';
      default:
        return role;
    }
  };

  const getBgColor = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-red-100 text-red-700';
      case 'SYSTEM_MANAGER':
        return 'bg-purple-100 text-purple-700';
      case 'OPERATION_MANAGER':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getBgColor()}`}>
      {getRoleDisplay(role)}
    </div>
  );
};

export default AdminRoleCell;
