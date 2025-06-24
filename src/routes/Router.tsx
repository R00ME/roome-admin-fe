import BaseLayout from './layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import Main from '@/pages/main/Main';
import Login from '@/pages/login/Login';
import Events from '@/pages/events/Events';
import DashboardLayout from './layout/DashboardLayout';
import Admins from '@/pages/admins/Admins';
import Mypage from '../pages/mypage/Mypage';
import ChangePassword from '../pages/mypage/components/ChangePassword';
import EditProfile from '../pages/mypage/EditPRofile';

const Router = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route
          path='/'
          element={<Main />}
        />

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='admins'
          element={<Admins />}
        />

        <Route
          path='settings'
          element={<Mypage />}
        />
        <Route
          path='settings/profile'
          element={<EditProfile />}
        />
        <Route
          path='settings/password'
          element={<ChangePassword />}
        />

        <Route
          path='events'
          element={<Events />}
        />
      </Route>

      <Route
        path='dashboard'
        element={<DashboardLayout />}>
        <Route
          path='service'
          element={<ServiceDashboard />}
        />
        {/* <Route path='user' element={< UserDashboard />} /> */}
        {/* <Route path='system' element={< SystemDashboard />} /> */}
      </Route>

    </Routes>
  );
};

export default Router;
