import type { FetchProductsParams } from '../../api/types';
import type { BuildFetchProductsParamsArgs } from '../types';

export const buildFetchProductsParams = ({
  limit,
  page = 1,
  q,
}: BuildFetchProductsParamsArgs): FetchProductsParams => {
  const trimmedQuery = q.trim();

  return {
    limit,
    skip: (page - 1) * limit,
    q: trimmedQuery ? trimmedQuery : undefined,
  };
};
