import Admins from '@/pages/admins/Admins';
import Error from '@/pages/error/Error';
import Events from '@/pages/events/Events';
import Login from '@/pages/login/Login';
import Main from '@/pages/main/Main';
import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import { Route, Routes } from 'react-router-dom';
import ChangePassword from '../pages/mypage/ChangePassword';
import EditProfile from '@/pages/mypage/EditProfile';
import Mypage from '../pages/mypage/Mypage';
import BaseLayout from './layout/BaseLayout';
import DashboardLayout from './layout/DashboardLayout';
import UserDashboard from '../pages/user-dashboard/UserDashboard';
import ManagementLayout from './layout/ManagementLayout';

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
      </Route>
      
      <Route
        path='dashboard'
        element={<DashboardLayout />}>
        <Route
          path='service'
          element={<ServiceDashboard />}
        />
        <Route
          path='user'
          element={<UserDashboard />}
        />
        {/* <Route path='system' element={< SystemDashboard />} /> */}
      </Route>

      <Route element={<ManagementLayout />}>
        <Route
          path='admins'
          element={<Admins />}
        />
        <Route
          path='events'
          element={<Events />}
        />
      </Route>

      <Route
        path='*'
        element={<Error />}
      />
    </Routes>
  );
};

export default Router;
