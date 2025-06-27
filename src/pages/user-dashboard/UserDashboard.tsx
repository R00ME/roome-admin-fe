import RankingUserList from "./components/RankingUserList";
import UserActivity from "./components/UserActivity";

export default function UserDashboard() {
  return (
    <main className="flex gap-10">
      <UserActivity />
      <RankingUserList />
    </main>
  )
}
