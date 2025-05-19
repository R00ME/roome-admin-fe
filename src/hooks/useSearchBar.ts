import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_ITEMS, SearchItem } from '@/constants/search-items';

export function useSearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    setQuery('');
    navigate(item.path);
  };

  const filteredItems = SEARCH_ITEMS.filter(
    (item) =>
      item.category === '서비스 자원' &&
      (query === '' ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())),
  );

  return {
    open,
    setOpen,
    query,
    setQuery,
    filteredItems,
    handleSelect,
  };
}
