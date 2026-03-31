import { Button } from 'antd';

import RefreshIcon from '@/assets/refresh.svg?react';
import { useRefreshProducts } from './model/useRefreshProducts';

type Props = {
  className?: string;
};

export const RefreshProductsButton = ({ className }: Props) => {
  const { handleRefresh } = useRefreshProducts();

  return <Button icon={<RefreshIcon />} onClick={handleRefresh} className={className} />;
};
