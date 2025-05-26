import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import BaseLayout from './layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import Main from '@/pages/main/Main';
import Events from '@/pages/Events/Events';

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
        {/* <Route path='admins'>

        </Route> */}
        <Route
          path='events'
          element={<Events />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
