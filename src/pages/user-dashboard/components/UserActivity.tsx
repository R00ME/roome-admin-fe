import { ActivityIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TableFooter, TableHeader } from '../../../components/table';
import { MOCK_USER_DATA } from '../../../constants/user-dashboard/userActivity';
import { UserActivityItem } from '../../../types/user-dashboard';
import UserActivityTable from './UserActivityTable';
import UserDetailDrawer from './userDetailDrawer/UserDetailDrawer';

export default function UserActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UserActivityItem[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserActivityItem | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setData(MOCK_USER_DATA);
    setIsLoading(false);
  }, []);

  const handleRowClick = (user: UserActivityItem) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  return (
    <section>
      <TableHeader
        icon={ActivityIcon}
        title='최근 사용자 활동'
        tabs={[
          { value: 'name', label: '이름순' },
          { value: 'date', label: '가입순' },
        ]}
        defaultTab='name'
      />
      <UserActivityTable
        data={data}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />
      {drawerOpen && selectedUser && (
        <UserDetailDrawer
          open={drawerOpen}
          user={selectedUser}
          onClose={() => setDrawerOpen(false)}
        />
      )}
      <TableFooter />
    </section>
  );
}
