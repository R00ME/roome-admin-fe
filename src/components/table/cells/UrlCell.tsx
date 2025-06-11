import { memo } from 'react';

const UrlCell = memo(({ url }: UrlCellProps) => {
  return <span className='text-blue-500 user-select-none'>{url}</span>;
});

UrlCell.displayName = 'UrlCell';

export default UrlCell;
