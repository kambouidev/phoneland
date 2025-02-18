import { useState, ChangeEvent, useEffect } from 'react';
import { useDebounce } from '@globalHooks/useDebounce';

interface UseSearchProps {
  onSearch?: () => void;
  debounceTime?: number;
  initialValue?: string;
}

export const useSearch = ({ onSearch, debounceTime = 500, initialValue = '' }: UseSearchProps = {}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [prevSearchQuery, setPrevSearchQuery] = useState(initialValue);
  const debouncedSearch = useDebounce(searchQuery, debounceTime);

  useEffect(() => {
    if (!prevSearchQuery && debouncedSearch) {
      onSearch?.();
    }
    setPrevSearchQuery(debouncedSearch);
  }, [debouncedSearch, prevSearchQuery, onSearch]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => setSearchQuery('');

  return {
    searchQuery,
    debouncedSearch,
    handleSearch,
    clearSearch,
  };
};
