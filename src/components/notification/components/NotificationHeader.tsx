import ReplayIcon from '@/assets/icons/header/replay-icon.svg?react';
import { useState } from 'react';

interface NotificationHeaderProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

const NotificationHeader = ({
  onRefresh,
  isLoading = false,
}: NotificationHeaderProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    if (isLoading) return;

    setIsSpinning(true);
    onRefresh();
    setTimeout(() => setIsSpinning(false), 500); // 애니메이션 시간과 동일하게 설정
  };

  return (
    <div className='space-y-2 border-b border-black/10 flex items-center justify-between'>
      <h3 className='text-xl m-0 font-semibold'>알림</h3>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className='text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
        <ReplayIcon className={isSpinning ? 'animate-spin-once' : ''} />
      </button>
    </div>
  );
};

export default NotificationHeader;
