import closeIcon from '@/assets/icons/user-dashboard/arrow.svg';
import maximizeIcon from '@/assets/icons/user-dashboard/maximize.svg';
import { DrawerActionsProps } from '../../../../types/user-dashboard';

export default function DrawerActions({ onClose }: DrawerActionsProps) {
  return (
    <div className='absolute top-2 flex flex-col justify-center'>
      <button
        className='w-8.5 h-10 flex items-center justify-center rounded-tr-2xl bg-white  border-2 border-l-0 hover:bg-gray-100 transition'
        aria-label='최대화'>
        <img
          src={maximizeIcon}
          alt='최대화하기'
          className='w-4 h-4'
        />
      </button>
      <button
        className='w-8.5 h-10 flex items-center justify-center rounded-br-2xl  bg-white  border-2 border-l-0 border-t-0 hover:bg-gray-100 transition'
        aria-label='닫기'
        onClick={onClose}>
        <img
          src={closeIcon}
          alt='닫기'
          className='w-4 h-4'
        />
      </button>
    </div>
  );
}
