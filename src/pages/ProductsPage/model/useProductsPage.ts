import { useGate, useUnit } from 'effector-react';

import {
  ProductsPageGate,
  $products,
  $isLoading,
  $error,
  $page,
  $total,
  $limit,
  pageChanged,
} from '@/entities/products/model';

export const useProductsPage = () => {
  useGate(ProductsPageGate);

  return useUnit({
    products: $products,
    isLoading: $isLoading,
    error: $error,
    page: $page,
    total: $total,
    limit: $limit,
    onPageChange: pageChanged,
  });
};
