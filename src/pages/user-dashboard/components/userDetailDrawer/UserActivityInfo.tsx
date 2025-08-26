import profileImg from '@/assets/images/default-profile-img.jpg';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

export default function UserActivityInfo() {
  return (
    <section className='flex gap-3 items-center justify-between '>
      <section className='flex flex-row items-center justify-center gap-2'>
        <Avatar>
          <AvatarImage
            src={profileImg}
            alt='프로필'
            className='w-18 rounded-xl border'
          />
        </Avatar>
        <div className='flex flex-col items-start'>
          <span className='flex items-baseline gap-1 text-[#293F66]'>
            <p className='font-bold text-lg '>구름이</p>
            <p className=''>님</p>
          </span>
          <p className='text-[#999999]'>gooroome@roomeio.kr</p>
        </div>
      </section>
      <section className='flex gap-12 border py-3 px-5 rounded-lg'>
        <span className='flex flex-col text-[#999999] w-full'>
          <span className='flex justify-between items-center text-sm'>
            <p>가입일</p>
            <p className=' text-xs'>2025.05.05</p>
          </span>
          <span className='flex justify-between items-center text-sm'>
            <p className='whitespace-nowrap'>최근 활동일</p>
            <p className='pl-10 text-xs'>2025.05.05</p>
          </span>
          <span className='flex justify-between items-center text-sm'>
            <p>활동 IP</p>
            <p className=' text-xs'>123.324.34.90</p>
          </span>
        </span>
      </section>
    </section>
  );
}
