import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_ITEMS, SearchItem } from '@/constants/search-items';

export function useSearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = useCallback(
    (item: SearchItem) => {
      setOpen(false);
      setQuery('');
      navigate(item.path);
    },
    [navigate, setOpen, setQuery],
  );

  const filteredItems = SEARCH_ITEMS.filter(
    (item) =>
      item.category === '서비스 자원' &&
      (query === '' ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleSelect(filteredItems[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredItems, selectedIndex, handleSelect]);

  useEffect(() => {
    if (!open) {
      setSelectedIndex(0);
    }
  }, [open]);

  return {
    open,
    setOpen,
    query,
    setQuery,
    filteredItems,
    handleSelect,
    selectedIndex,
  };
}
