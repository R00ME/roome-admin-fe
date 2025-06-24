import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import profileImg from '@/assets/images/default-profile-img.jpg';


export default function ProfileImage() {
  return (
    <div className='w-full flex justify-center'>
      <Avatar className='w-28 h-28 mb-2'>
        <AvatarImage
          src={profileImg}
          alt='프로필'
          className='rounded-full border'
        />
      </Avatar>
    </div>
  );
}
