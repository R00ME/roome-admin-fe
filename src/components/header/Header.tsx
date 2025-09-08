import defaultProfile from '@/assets/icons/header/default-profile.png';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import Notification from '../notification/Notification';
import ProfileCard from '../profile/ProfileCard';
import AuthButton from './components/AuthButton';
import HeaderSearchBar from './components/HeaderSearchBar';
import ProfileButton from './components/ProfileButton';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useUserStore();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <>
      <header className='h-17 z-40 px-5 flex items-center justify-between bg-[#ffffff]'>
        <div className='flex flex-row items-center gap-7'>
          <h3 className='text-xl text-[#293F66]'>👋🏻 Hi {user?.username}</h3>
          <HeaderSearchBar />
        </div>
        <div className='flex items-center gap-2'>
          <Notification />
          <AuthButton />
          <ProfileButton
            profile={defaultProfile}
            onClick={() => setIsProfileOpen((prev) => !prev)}
          />
        </div>
      </header>
      {isProfileOpen && user && (
        <div ref={cardRef}>
          <ProfileCard {...user} />
        </div>
      )}
    </>
  );
};

export default Header;
