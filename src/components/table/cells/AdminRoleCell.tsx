const AdminRoleCell = ({ role }: AdminRoleCellProps) => {
  const getBgColor = () => {
    switch (role) {
      case '운영 관리자':
        return 'bg-blue-100 text-blue-700';
      case '시스템 관리자':
        return 'bg-purple-100 text-purple-700';
      case '일반 관리자':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${getBgColor()}`}>
      {role}
    </div>
  );
};

export default AdminRoleCell;
