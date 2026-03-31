import { createEffect } from 'effector';
import { fetchProducts, type FetchProductsParams, type ProductsResponse } from '../api';

export const fetchProductsFx = createEffect<FetchProductsParams, ProductsResponse>(fetchProducts);
