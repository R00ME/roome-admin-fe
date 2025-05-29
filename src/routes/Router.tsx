import BaseLayout from './layout/BaseLayout';
import { Route, Routes } from 'react-router-dom';
import ServiceDashboard from '@/pages/service-dashboard/ServiceDashboard';
import Main from '@/pages/main/Main';
import Login from '@/pages/login/Login';
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
      <Route path='/' element={<BaseLayout />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default Router;
