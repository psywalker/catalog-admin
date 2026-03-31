import { useCallback, useMemo } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd/es/table';

import styles from './ProductsTable.module.scss';
import { getProductsTableColumns } from './lib/getProductsTableColumns';
import { useRowSelection } from './model/useRowSelection';
import type { ProductTableRow, ProductsTableProps } from './model/types';

export const ProductsTable = ({
  products,
  loading,
  page,
  total,
  limit,
  onPageChange,
  onAdd,
  onMenu,
}: ProductsTableProps) => {
  const { selectedRowKeys, toggleRow, handleSelectionChange } = useRowSelection();

  const dataSource = useMemo<ProductTableRow[]>(
    () => products.map((product) => ({ ...product, key: product.id })),
    [products],
  );

  const columns = useMemo(
    () =>
      getProductsTableColumns({
        styles,
        onAdd,
        onMenu,
      }),
    [onAdd, onMenu],
  );

  const onRow: TableProps<ProductTableRow>['onRow'] = useCallback(
    (record: ProductTableRow) => ({
      onClick: () => toggleRow(record.key),
    }),
    [toggleRow],
  );

  const handlePageChange = useCallback(
    (nextPage: number) => {
      onPageChange(nextPage);
    },
    [onPageChange],
  );

  return (
    <div className={styles.tableWrap}>
      <Table<ProductTableRow>
        className={styles.tableRoot}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        scroll={{ x: 1200 }}
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectionChange,
          columnWidth: 48,
        }}
        onRow={onRow}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: handlePageChange,
          showSizeChanger: false,
          placement: ['bottomEnd'],
          rootClassName: styles.paginationRoot,
          showTotal: (itemsTotal, range) => (
            <span className={styles.totalText}>
              Показано{' '}
              <span className={styles.totalStrong}>
                {range[0]}-{range[1]}
              </span>{' '}
              из <span className={styles.totalStrong}>{itemsTotal}</span>
            </span>
          ),
        }}
      />
    </div>
  );
};
