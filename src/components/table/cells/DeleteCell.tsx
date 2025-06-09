import { memo } from 'react';
import BinIcon from '@/assets/icons/bin-icon.svg?react';

interface DeleteCellProps {
  onClick: () => void;
}

const DeleteCell = memo(({ onClick }: DeleteCellProps) => {
  return (
    <button
      onClick={onClick}
      className='group p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'>
      <BinIcon className='w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors' />
    </button>
  );
});

DeleteCell.displayName = 'DeleteCell';

export default DeleteCell;
