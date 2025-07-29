import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <section className='h-screen flex overflow-hidden'>
      <Sidebar />
      <section className='flex flex-col flex-1 min-w-0'>
        <Header />
        <main className='flex-1 overflow-y-auto px-20 py-12 bg-[#F7FBFE] shadow-inner '>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default DashboardLayout;
