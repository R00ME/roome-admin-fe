import RankingUserList from './components/RankingUserList';
import UserActivity from './components/UserActivity';

export default function UserDashboard() {
  return (
    <main className='flex gap-7 items-baseline '>
      <section className='flex-1 '>
        <UserActivity />
      </section>
      <section className='min-w-72 2xl:min-w-90'>
        <RankingUserList />
      </section>
    </main>
  );
}
