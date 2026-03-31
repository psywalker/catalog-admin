import { useCallback } from 'react';
import { useUnit } from 'effector-react';

import { $searchInput, searchInputChanged } from '@/entities/products/model';

export const useSearch = () => {
  const { value, setValue } = useUnit({
    value: $searchInput,
    setValue: searchInputChanged,
  });

  const handleChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
    },
    [setValue],
  );

  return {
    value,
    handleChange,
  };
};
