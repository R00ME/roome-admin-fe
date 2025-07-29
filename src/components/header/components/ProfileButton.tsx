import defaultProfile from '@/assets/images/default-profile-img.jpg';

const ProfileButton = ({ profile, onClick }: { profile: string; onClick?: () => void }) => {
  return (
    <button onClick={onClick} className='flex cursor-pointer'>
      <img
        src={profile || defaultProfile}
        className='h-9 w-9 rounded-full'
        alt='profile'
      />
    </button>
  );
};

export default ProfileButton;
