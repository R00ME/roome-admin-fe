import Header from '@/components/header/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
  return (
    <section className='h-screen flex overflow-hidden'>
      <Sidebar />
      <section className='flex flex-col flex-1'>
        <Header />
        <main className='flex-1 overflow-y-auto px-20 py-12 bg-[#F7FBFE]'>
          <Outlet />
        </main>
      </section>
    </section>
  );
};

export default BaseLayout;
