import type { Product } from '../api/types';
import type { NewProductPayload } from '../model/types';

export const mapNewProductPayloadToProduct = (payload: NewProductPayload): Product => ({
  id: payload.id ?? Date.now(),
  title: payload.title,
  brand: payload.brand,
  sku: payload.sku,
  price: payload.price,
  rating: payload.rating,
  category: payload.category ?? 'No category',
  thumbnail: payload.thumbnail ?? '',
});
