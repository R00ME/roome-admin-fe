import { memo } from 'react';
import { cn } from '@/lib/utils';

interface StatusCellProps {
  status: string;
}

const StatusCell = memo(({ status }: StatusCellProps) => {
  return (
    <span
      className={cn(
        status === '대기중'
          ? 'bg-[#E6F4FF] text-[#3BA3FF]'
          : 'bg-[#F5F5F5] text-[#BDBDBD]',
        'px-3 py-1 rounded-full text-xs font-semibold user-select-none',
      )}>
      {status}
    </span>
  );
});

StatusCell.displayName = 'StatusCell';

export default StatusCell;
