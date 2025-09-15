import profileImg from '@/assets/images/default-profile-img.jpg';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useSelectUserStore } from '../../../../store/useSelectUserStore';
import { formatKoreanDateTimeShort } from '../../../../utils/dateFormatter';

export default function UserActivityInfo() {
  const { selectedUser } = useSelectUserStore();

  return (
    <section className='flex gap-3 items-center justify-between '>
      <section className='flex flex-row items-center justify-center gap-2'>
        <Avatar>
          <AvatarImage
            src={selectedUser?.profileImage || profileImg}
            alt='프로필'
            className='w-18 rounded-xl border'
          />
        </Avatar>
        <div className='flex flex-col items-start'>
          <span className='flex items-baseline gap-1 text-[#293F66]'>
            <p className='font-bold text-lg '>{selectedUser?.nickname}</p>
            <p className=''>님</p>
          </span>
          <p className='text-[#999999]'>{selectedUser?.email}</p>
        </div>
      </section>
      <section className='flex gap-12 border py-3 px-5 rounded-lg'>
        <div className='flex flex-col text-[#999999] w-full'>
          <span className='flex justify-between gap-10 items-center text-sm'>
            <p>가입일</p>
            <p className=' text-xs'>{selectedUser?.createdAt ? formatKoreanDateTimeShort(selectedUser?.createdAt) : ''}</p>
          </span>

          <span className='flex justify-between gap-10 items-center text-sm'>
            <p className='whitespace-nowrap'>최근 활동일</p>
            <p className='text-xs'>{selectedUser?.lastLogin ? formatKoreanDateTimeShort(selectedUser.lastLogin): ''}</p>
          </span>
        </div>
      </section>
    </section>
  );
}
