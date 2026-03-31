import styles from './ProductsPage.module.scss';

import { Spin } from 'antd';

import { Search } from '@/features/Search';
import { AddProductModal } from '@/features/AddProductModal';
import { RefreshProductsButton } from '@/features/RefreshProductsButton';
import { ProductsTable } from '@/widgets/ProductsTable';
import { useProductsPage } from './model/useProductsPage';

export const ProductsPage = () => {
  const { products, isLoading, error, page, total, limit, onPageChange } = useProductsPage();

  return (
    <div className={styles.container}>
      <Spin spinning={isLoading} fullscreen description="Loading..." size="large" />

      <div className={styles.search}>
        <h2 className={styles.title}>Товары</h2>

        <div className={styles.searchField}>
          <Search />
        </div>
      </div>

      <main className={styles.content}>
        <header className={styles.tableHeader}>
          <h2 className={styles.tableHeaderTitle}>Все позиции</h2>

          <div className={styles.addProduct}>
            <RefreshProductsButton className={styles.refreshButton} />
            <AddProductModal />
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
