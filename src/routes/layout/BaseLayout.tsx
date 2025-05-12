import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <div className='h-screen relative overflow-hidden'>
      <Header />
      <main className='relative pt-16 flex '>
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
