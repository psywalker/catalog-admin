import type { Product, ProductsResponse } from '../types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readNumber = (value: unknown, field: string): number => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Invalid products response: "${field}" must be a number`);
  }

  return value;
};

const readRequiredString = (value: unknown, field: string): string => {
  if (typeof value !== 'string') {
    throw new Error(`Invalid products response: "${field}" must be a string`);
  }

  return value;
};

const parseProduct = (value: unknown): Product => {
  if (!isRecord(value)) {
    throw new Error('Invalid products response: product must be an object');
  }

  return {
    id: readNumber(value.id, 'products[].id'),
    title: readRequiredString(value.title, 'products[].title'),
    category: readRequiredString(value.category, 'products[].category'),
    price: readNumber(value.price, 'products[].price'),
    rating: readNumber(value.rating, 'products[].rating'),
    brand: typeof value.brand === 'string' ? value.brand : undefined,
    sku: typeof value.sku === 'string' ? value.sku : undefined,
    thumbnail: typeof value.thumbnail === 'string' ? value.thumbnail : '',
    stock: typeof value.stock === 'number' ? value.stock : undefined,
    description: typeof value.description === 'string' ? value.description : undefined,
    images: Array.isArray(value.images)
      ? value.images.filter((item): item is string => typeof item === 'string')
      : undefined,
  };
};

export const getProductsErrorMessage = (value: unknown, fallback: string): string => {
  if (isRecord(value) && typeof value.message === 'string') {
    return value.message;
  }

  return fallback;
};

export const parseProductsResponse = (value: unknown): ProductsResponse => {
  if (!isRecord(value)) {
    throw new Error('Invalid products response: root value must be an object');
  }

  if (!Array.isArray(value.products)) {
    throw new Error('Invalid products response: "products" must be an array');
  }

  return {
    products: value.products.map(parseProduct),
    total: readNumber(value.total, 'total'),
    skip: readNumber(value.skip, 'skip'),
    limit: readNumber(value.limit, 'limit'),
  };
};
