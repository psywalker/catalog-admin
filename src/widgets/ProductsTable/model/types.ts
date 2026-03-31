import type { Product } from '@/entities/products/api/types';

export type ProductTableRow = Product & { key: number };

export type ProductsTableProps = {
  products: Product[];
  loading?: boolean;
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onAdd?: (id: number) => void;
  onMenu?: (id: number) => void;
};

export type GetProductsTableColumnsParams = {
  styles: Record<string, string>;
  onAdd?: (id: number) => void;
  onMenu?: (id: number) => void;
};
