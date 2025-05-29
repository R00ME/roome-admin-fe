import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='h-screen relative overflow-hidden'>
      <Header />
      <main className='relative pt-16 flex'>
        <Sidebar />
        <div className='flex-1 px-20 py-12'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
