import UserActivityTabs from '../userActivityTabs/UserActivityTabs';
import PreferredFunctions from './PreferredFunctions';
import UserActivityInfo from './UserActivityInfo';

export default function UserDetailContent({
  drawerWidth,
}: {
  drawerWidth: number;
}) {
  return (
    <section className='flex flex-col items-center justify-center w-full h-full px-18 py-10'>
      <section
        className={`flex flex-col items-stretch justify-center gap-6 w-full h-full mb-5`}>
        <UserActivityInfo />
        {/* 사용자 활동 */}
        <UserActivityTabs drawerWidth={drawerWidth} />
      </section>
      {/* 선호하는 기능 */}
      <PreferredFunctions drawerWidth={drawerWidth} />
    </section>
  );
}
