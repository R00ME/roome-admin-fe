import { memo } from 'react';

interface UrlCellProps {
  url: string;
}

const UrlCell = memo(({ url }: UrlCellProps) => {
  return <span className='text-blue-500 user-select-none'>{url}</span>;
});

UrlCell.displayName = 'UrlCell';

export default UrlCell;
