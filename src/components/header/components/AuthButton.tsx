import LogoutIcon from '@/assets/icons/header/logout-icon.svg?react';

const AuthButton = () => {
  return (
    <button className='rounded-full p-1 hover:bg-white/20 transition-all duration-300 inline-block cursor-pointer'>
      <LogoutIcon className='text-white' />
    </button>
  );
};

export default AuthButton;
