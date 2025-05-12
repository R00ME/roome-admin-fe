import HeaderSearchBar from './components/HeaderSearchBar';
import AuthButton from './components/AuthButton';
import ProfileButton from './components/ProfileButton';
import defaultProfile from '@/assets/icons/header/default-profile.png';
import logoutIcon from '@/assets/icons/header/logout-icon.svg';
import Logo from './components/Logo';

const Header = () => {
  return (
    <header
      className='w-[99.5vw] h-16 fixed top-0 left-0 z-10 flex items-center justify-between rounded-r-full'
      style={{
        background: 'linear-gradient(90deg, #888CFC 0%, #93B9FF 87%)',
      }}>
      <Logo />

      <div className='flex items-center gap-4 px-2'>
        <HeaderSearchBar />
        <ProfileButton profile={defaultProfile} />
        <AuthButton
          icon={
            <img
              src={logoutIcon}
              alt='logout'
            />
          }
        />
      </div>
    </header>
  );
};

export default Header;
