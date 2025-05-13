import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import BaseLayout from './layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import Main from '@/pages/main/Main';

const Router = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route
          path='/'
          element={<Main />}
        />
        <Route path='dashboard'>
          <Route
            path='service'
            element={<ServiceDashboard />}
          />
          {/* <Route path='user' element={< UserDashboard />} /> */}
          {/* <Route path='system' element={< SystemDashboard />} /> */}
        </Route>
        {/* <Route path='admin' /> */}
        {/* <Route path='event' /> */}
      </Route>
    </Routes>
  );
};

export default Router;
