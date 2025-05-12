import defaultProfile from '@/assets/icons/header/default-profile.png';

const ProfileButton = ({ profile }: { profile: string }) => {
  return (
    <button className='rounded-full p-1 inline-block bg-white/80 hover:bg-white/50 transition-all duration-300 cursor-pointer'>
      <img
        src={profile || defaultProfile}
        className='h-10 w-10 rounded-full'
        alt='profile'
      />
    </button>
  );
};

export default ProfileButton;
