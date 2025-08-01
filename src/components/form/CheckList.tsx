import { memo } from 'react';

const CheckList = memo(({ items }: CheckListProps) => {
  return (
    <div className='space-y-3 bg-gray-100 px-3 py-2 rounded-lg'>
      {items.map((item, index) => (
        <div
          key={index}
          className='flex gap-3'>
          <div className='w-4 h-4 mt-1 bg-blue-500 rounded-sm flex items-center justify-center flex-shrink-0'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'>
              <path
                d='M2 6L5 9L10 3'
                stroke='white'
                strokeWidth='2'
              />
            </svg>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm'>{item.text}</span>
            {item.description && (
              <span className='text-xs text-gray-500'>
                {`(${item.description})`}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

CheckList.displayName = 'CheckList';

export default CheckList;
