import BaseLayout from './layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import Main from '@/pages/main/Main';
import Login from '@/pages/login/Login';
import Events from '@/pages/Events/Events';
import DashboardLayout from './layout/DashboardLayout';

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

        {/* <Route path='admin' /> */}
        <Route 
          path='event'
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
