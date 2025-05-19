import { useSearchBar } from '@/hooks/useSearchBar';
import SearchInput from './SearchInput';
import SearchResultList from './SearchResultList';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

const HeaderSearchBar = () => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    filteredItems,
    handleSelect,
    selectedIndex,
  } = useSearchBar();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setOpen(true);
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SearchInput
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
      </PopoverTrigger>
      <PopoverContent
        className='w-[300px] p-0'
        align='start'
        sideOffset={5}>
        <SearchResultList
          items={filteredItems}
          onSelect={handleSelect}
          selectedIndex={selectedIndex}
        />
      </PopoverContent>
    </Popover>
  );
};

export default HeaderSearchBar;
