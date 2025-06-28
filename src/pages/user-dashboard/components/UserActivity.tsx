import { useEffect, useState } from 'react';
import { TableFooter, TableHeader } from '../../../components/table';
import { ActivityIcon } from 'lucide-react';
import { UserActivityItem } from '../../../types/user-dashboard';
import UserActivityTable from './UserActivityTable';
import { MOCK_USER_DATA } from '../../../constants/user-dashboard/userActivity';

export default function UserActivity() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<UserActivityItem[]>([])

  useEffect(() => {
  setData(MOCK_USER_DATA);
  setIsLoading(false);
}, []);


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
      <UserActivityTable data={data} isLoading={isLoading}  />
      <TableFooter/>
    </section>
  );
}
