import { createEffect } from 'effector';
import { fetchProducts } from '../api/fetchProducts.ts';

export const fetchProductsFx = createEffect(fetchProducts);
