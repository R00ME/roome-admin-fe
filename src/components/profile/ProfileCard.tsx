import profileImg from '@/assets/images/default-profile-img.jpg';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router-dom';
import { AdminUser } from '../../types/auth';

export default function ProfileCard({adminEmail, username,}:AdminUser ) {
const navigate = useNavigate();

  return (
    <Card className='fixed z-99 top-20 right-8 flex flex-col justify-center items-center w-58 rounded-xl p-6 shadow-lg gap-3 '>

      {/* 프로필 이미지 */}
      <div className='flex flex-col items-center '>
        <Avatar className='w-18 h-18 mb-2 '>
          <AvatarImage
            src={profileImg}
            alt='프로필 이미지'
            className='rounded-full border'
          />
        </Avatar>

        {/* 이름 + 등급 + 이메일 */}
        <div className='flex flex-col items-center'>
          <div className='flex gap-2'>
            <span className='flex items-center gap-1'>
              <p className={`text-[#293F66] font-semibold`}>{username.length > 4 ? username.slice(0,5)+'...' : username}</p>
              <p className='text-sm font-medium'>님</p>
            </span>
            <p className='text-[10px] font-medium text-[#4983EF] bg-[#DEEBFF]/80 rounded-full px-2 py-1'>
              최고 마스터
            </p>
          </div>
          <p className='mt-1 text-xs text-[#999999]/70'>{adminEmail}</p>
        </div>
      </div>

      {/* 버튼 */}
      <button
        onClick={()=> navigate('/settings')} 
        className='text-sm font-medium bg-[#293F66] text-white px-10 py-1.5 rounded-full'> 
        마이페이지
      </button>
    </Card>
  );
}
