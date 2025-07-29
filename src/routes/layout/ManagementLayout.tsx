import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const ManagementLayout = () => {
  return (
    <div className='h-screen relative overflow-hidden'>
      <Sidebar />
      <section>
        <Header />
        <main className='w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-6 sm:py-8 md:py-10 xl:py-12 overflow-x-auto'>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default ManagementLayout;
