import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '@/assets/icons/header/search-icon.svg';
import { SEARCH_ITEMS, SearchItem } from '@/constants/search-items';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const HeaderSearchBar = () => {
  const [open, setOpen] = useState(false);
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
    navigate(item.path);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex items-center gap-2 p-2 bg-white/20 rounded-full'>
          <button className='bg-transparent outline-none px-2 text-white/50 text-left w-[200px]'>
            기능 조회 (⌘ / ctrl + K)
          </button>
          <button className='rounded-full p-2 bg-white/80 hover:bg-white/50 transition-all duration-300 inline-block cursor-pointer'>
            <img
              src={searchIcon}
              alt='search'
            />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className='w-[300px] p-0'
        align='start'>
        <Command className='rounded-lg border-none'>
          <CommandInput
            placeholder='기능 검색...'
            className='border-b border-gray-100'
          />
          <CommandList>
            <CommandEmpty className='py-6 text-center text-sm'>
              검색 결과가 없습니다.
            </CommandEmpty>
            <CommandGroup
              heading='서비스 자원'
              className='p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500'>
              {SEARCH_ITEMS.filter(
                (item) => item.category === '서비스 자원',
              ).map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => handleSelect(item)}
                  className='px-2 py-1.5 rounded-md cursor-pointer aria-selected:bg-blue-50'>
                  <div>
                    <div className='font-medium text-gray-700'>
                      {item.title}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {item.description}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderSearchBar;
