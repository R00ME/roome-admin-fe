import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '@/assets/icons/header/search-icon.svg';
import { SEARCH_ITEMS, SearchItem } from '@/constants/search-items';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const HeaderSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    setQuery('');
    navigate(item.path);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setQuery(e.target.value);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const filteredItems = SEARCH_ITEMS.filter(
    (item) =>
      item.category === '서비스 자원' &&
      (query === '' ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex items-center gap-2 p-2 bg-white/20 rounded-full cursor-pointer pointer-events-auto'>
          <input
            value={query}
            onChange={handleInputChange}
            onClick={handleInputClick}
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
      </PopoverTrigger>
      <PopoverContent
        className='w-[300px] p-0'
        align='start'
        sideOffset={5}>
        <div className='max-h-[300px] overflow-auto rounded-lg bg-white'>
          {filteredItems.length === 0 ? (
            <div className='py-6 text-center text-sm text-gray-500'>
              검색 결과가 없습니다.
            </div>
          ) : (
            <div className='p-2'>
              <div className='px-2 py-1.5 text-sm font-medium text-gray-500'>
                서비스 자원
              </div>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className='px-2 py-1.5 rounded-md cursor-pointer hover:bg-blue-50'>
                  <div className='font-medium text-gray-700'>{item.title}</div>
                  <div className='text-sm text-gray-500'>
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderSearchBar;
