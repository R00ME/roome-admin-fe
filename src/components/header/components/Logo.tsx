import { Link } from 'react-router-dom';
import logo from '@/assets/icons/header/logo.svg';

const Logo = () => {
  return (
    <h1 className='h-fit w-fit'>
      <Link
        to='/'
        className='bg-[#7A87EE] rounded-r-full p-2 inline-block'>
        <img
          src={logo}
          alt='logo'
        />
      </Link>
    </h1>
  );
};

export default Logo;
