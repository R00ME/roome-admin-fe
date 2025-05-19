import React, { forwardRef } from 'react';
import searchIcon from '@/assets/icons/header/search-icon.svg';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ value, onChange, onFocus }, ref) => (
    <div
      ref={ref}
      className='flex items-center gap-2 p-2 bg-white/20 rounded-full cursor-pointer pointer-events-auto'>
      <input
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className='bg-transparent outline-none px-2 text-white text-left w-full placeholder:text-white/50 cursor-text relative z-15'
        placeholder='기능 검색...'
        type='text'
      />
      <div className='rounded-full p-2 bg-white/80 hover:bg-white/50 transition-all duration-300 shrink-0'>
        <img
          src={searchIcon}
          alt='search'
        />
      </div>
    </div>
  ),
);

export default SearchInput;
