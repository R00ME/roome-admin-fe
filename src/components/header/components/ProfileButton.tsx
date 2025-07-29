import defaultProfile from '@/assets/images/default-profile-img.jpg';

const ProfileButton = ({ profile }: { profile: string }) => {
  return (
    <button className='flex cursor-pointer'>
      <img
        src={profile || defaultProfile}
        className='h-9 w-9 rounded-full'
        alt='profile'
      />
    </button>
  );
};

export default ProfileButton;
