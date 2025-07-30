import { Link } from 'react-router-dom';
import logo from '@/assets/icons/header/logo.svg';

const Logo = () => {
  return (
    <h1 className='h-fit w-fit'>
      <Link
        to='/'
        >
        <img
          src={logo}
          alt='logo'
          className='w-9.5 aspect-auto'
        />
      </Link>
    </h1>
  );
};

export default Logo;
