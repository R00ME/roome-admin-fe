import { ActivityIcon } from 'lucide-react';
import { useActionState, useEffect, useMemo, useState } from 'react';
import { fetchRecentUserActivity } from '../../../apis/userdashboard';
import { TableFooter, TableHeader } from '../../../components/table';
import { LoadArgs, SortKey, UAState, UserActivityItem } from '../../../types/user-dashboard';
import UserActivityTable from './UserActivityTable';
import UserDetailDrawer from './userDetailDrawer/UserDetailDrawer';

const initialState: UAState = { data: [], paging: undefined, error: null };

async function loadUserActivity(
  prev: UAState,
  args: LoadArgs,
): Promise<UAState> {
  try {
    const page = args.page ?? 1;
    const size = args.size ?? 10;
    const res = await fetchRecentUserActivity(page, size);

    return {
      data: res.items,
      paging: res.paging,
      error: null,
    };
  } catch (e) {
    return {
      ...prev,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
}

export default function UserActivity() {
  const [state, load, isPending] = useActionState(
    loadUserActivity,
    initialState,
  );
  const [selectedUser, setSelectedUser] = useState<UserActivityItem | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('name');

  useEffect(() => {
    load({ page: 1, size: 10 });
  }, [load]);

  const handleRowClick = (user: UserActivityItem) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handlePageChange = (nextPage: number) => {
    const size = state.paging?.pageSize ?? 10;
    load({ page: nextPage, size });
  };

  const koCollator = useMemo(() => new Intl.Collator('ko'), []);

  const sortedData = useMemo(() => {
    const arr = [...(state.data ?? [])];
    if (sortKey === 'name') {
      // ㄱㄴㄷㄹ (오름차순)
      arr.sort((a, b) =>
        koCollator.compare(a.nickname ?? '', b.nickname ?? ''),
      );
    } else {
      // 가입순
      arr.sort((a, b) => {
        const ta = Date.parse(a.createdAt ?? '');
        const tb = Date.parse(b.createdAt ?? '');
        if (isNaN(ta) && isNaN(tb)) return 0;
        if (isNaN(ta)) return 1;
        if (isNaN(tb)) return -1;
        return tb - ta;
      });
    }
    return arr;
  }, [state.data, sortKey, koCollator]);

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
        onTabChange={(val: string) => setSortKey((val as SortKey) ?? 'name')}
      />
      <UserActivityTable
        data={sortedData}
        isLoading={isPending}
        onRowClick={handleRowClick}
      />
      {drawerOpen && selectedUser && (
        <UserDetailDrawer
          open={drawerOpen}
          user={selectedUser}
          onClose={() => setDrawerOpen(false)}
        />
      )}
      <TableFooter
        currentPage={state.paging?.pageNumber ?? 1}
        totalPages={state.paging?.totalPages ?? 1}
        onPageChange={handlePageChange}
        isLoading={isPending}
      />
    </section>
  );
}
