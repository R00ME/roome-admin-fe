import Admins from '@/pages/admins/Admins';
import Error from '@/pages/error/Error';
import Events from '@/pages/Events/Events';
import Login from '@/pages/login/Login';
import Main from '@/pages/main/Main';
import EditProfile from '@/pages/mypage/EditProfile';
import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import { Route, Routes } from 'react-router-dom';
import ChangePassword from '../pages/mypage/ChangePassword';
import Mypage from '../pages/mypage/Mypage';
import UserDashboard from '../pages/user-dashboard/UserDashboard';
import BaseLayout from './layout/BaseLayout';
import DashboardLayout from './layout/DashboardLayout';
import ManagementLayout from './layout/ManagementLayout';
import ProtectedRoute from './ProtectedRoute';
import SystemDashboard from '@/pages/system-dashboard/SystemDashboard';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Login />}
      />
      {/* 보호 라우터 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<BaseLayout />}>
          <Route
            path='/'
            element={<Main />}
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
          <Route
            path='system'
            element={<SystemDashboard />}
          />
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
      </Route>

      <Route
        path='*'
        element={<Error />}
      />
    </Routes>
  );
};

export default Router;
