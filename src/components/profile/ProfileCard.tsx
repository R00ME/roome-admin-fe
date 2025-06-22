import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import profileImg from '@/assets/images/default-profile-img.jpg';

export default function ProfileCard() {
  return (
    <Card className='flex flex-col justify-center items-center w-58 rounded-xl relative p-6 shadow-md gap-3 '>
      {/* 닫기 버튼 */}
      <Button
        variant='ghost'
        size='icon'
        className='absolute right-3 top-3'>
        <X className='h-4 w-4 text-gray-300 ' />
      </Button>

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
              <p className='text-[#293F66] font-semibold'>구름이</p>
              <p className='text-sm font-medium'>님</p>
            </span>
            <p className='text-[10px] font-medium text-[#4983EF] bg-[#DEEBFF]/80 rounded-full px-2.5 py-1'>
              최고 마스터
            </p>
          </div>
          <p className='mt-1 text-xs text-[#999999]/70'>superadmin@gamil.com</p>
        </div>
      </div>

      {/* 버튼 */}
      <button className='text-sm font-medium bg-[#293F66] text-white px-10 py-1.5 rounded-full'> 마이페이지</button>
    </Card>
  );
}
