import UserActivityTabs from '../userActivityTabs/UserActivityTabs';
import PreferredFunctions from './PreferredFunctions';
import RiskScore from './RiskScore';
import UserActivityInfo from './UserActivityInfo';

export default function UserDetailContent({
  drawerWidth,
}: {
  drawerWidth: number;
}) {
  return (
    <section className='flex flex-col items-center justify-center w-full h-full px-18 py-10'>
      <section className={`flex items-stretch gap-10 w-full h-full mb-5`}>
        {/* 프로필 + 위험지수 */}
        <section
          className={`flex flex-col items-center justify-center gap-5 h-full`}>
          <UserActivityInfo />
          <RiskScore />
        </section>
        {/* 사용자 활동 */}
        <UserActivityTabs drawerWidth={drawerWidth} />
      </section>
      {/* 선호하는 기능 */}
      <PreferredFunctions drawerWidth={drawerWidth} />
    </section>
  );
}
