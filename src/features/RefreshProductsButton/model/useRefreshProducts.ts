import { useCallback } from 'react';
import { useUnit } from 'effector-react';

import { refreshRequested } from '@/entities/products/model';

export const useRefreshProducts = () => {
  const refresh = useUnit(refreshRequested);

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  return {
    handleRefresh,
  };
};
