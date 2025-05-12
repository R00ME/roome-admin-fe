import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';
const BaseLayout = () => {
  return (
    <div className='min-h-screen relative'>
      <main className='relative pt-16'>
        <Outlet />
      </main>
      <Header />
    </div>
  );
};

export default BaseLayout;
