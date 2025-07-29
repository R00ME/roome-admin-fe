import { forwardRef } from 'react';
import searchIcon from '@/assets/icons/header/search-icon.svg';

const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ value, onChange, onFocus }, ref) => (
    <div
      ref={ref}
      className='flex items-center gap-2 px-2.5 py-1.5 bg-[#F7FBFE] hover:border focus:border rounded-full cursor-pointer pointer-events-auto'>
      <div className='rounded-full mr-1 shrink-0'>
        <img
          src={searchIcon}
          alt='search'
        />
      </div>
      <input
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className='bg-transparent outline-none px-2 text-[#40495d] text-left w-full placeholder:text-[#A5ACB9] placeholder:text-sm cursor-text relative z-15'
        placeholder='기능 검색...'
        type='text'
      />
    </div>
  ),
);

export default SearchInput;
