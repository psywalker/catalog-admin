import styles from './ProductsPage.module.scss';
import { Search } from '@/features/Search';
import { ProductsTable } from '@/features/ProductsTable';
import { AddProductModal } from '@/features/AddProductModal';
import { Button, message } from 'antd';
import { useGate, useUnit } from 'effector-react';

import RefreshIcon from '@/assets/refresh.svg?react';
import { Spin } from 'antd';
import {
  ProductsPageGate,
  $products,
  $isLoading,
  $isAdding,
  $error,
  $page,
  $total,
  $limit,
  pageChanged,
  searchInputChanged,
  refreshRequested,
  addProductFx,
  type NewProductPayload,
} from '@/entities/products/model';

export const ProductsPage = () => {
  useGate(ProductsPageGate);

  const {
    products,
    isLoading,
    isAdding,
    error,
    page,
    total,
    limit,
    refresh,
    onSearchChange,
    onPageChange,
    addProduct,
  } = useUnit({
    products: $products,
    isLoading: $isLoading,
    isAdding: $isAdding,
    error: $error,
    page: $page,
    total: $total,
    limit: $limit,

    refresh: refreshRequested,
    onSearchChange: searchInputChanged,
    onPageChange: pageChanged,
    addProduct: addProductFx,
  });

  const handleAddSubmit = async (data: NewProductPayload) => {
    await addProduct(data);
    message.success({ content: 'Товар добавлен', duration: 2 });
  };

  return (
    <div className={styles.container}>
      <Spin spinning={isLoading || isAdding} fullscreen description="Loading..." size="large" />

      <div className={styles.search}>
        <h2 className={styles.title}>Товары</h2>

        <div className={styles.searchField}>
          <Search onChange={onSearchChange} />
        </div>
      </div>

      <main className={styles.content}>
        <header className={styles.tableHeader}>
          <h2 className={styles.tableHeaderTitle}>Все позиции</h2>

          <div className={styles.addProduct}>
            <Button icon={<RefreshIcon />} onClick={refresh} className={styles.refreshButton} />
            <AddProductModal onSubmit={handleAddSubmit} isSubmitting={isAdding} />
          </div>
        </header>

        {error ? <div className={styles.error}>Ошибка: {error.message}</div> : null}

        <div className={styles.table}>
          <ProductsTable
            products={products}
            loading={isLoading}
            page={page}
            total={total}
            limit={limit}
            onPageChange={onPageChange}
          />
        </div>
      </main>
    </div>
  );
};
