import { useState } from 'react';

export const usePagination = (itemsPerPage: number = 20) => {
  const [offset, setOffset] = useState(0);

  const handleNext = () => setOffset((prev) => prev + itemsPerPage);
  const handlePrevious = () => setOffset((prev) => Math.max(0, prev - itemsPerPage));
  const resetOffset = () => setOffset(0);

  return {
    offset,
    handleNext,
    handlePrevious,
    resetOffset,
  };
};
