import styles from './ProductsTable.module.scss';
import type { Product } from '@/entities/products/api/types';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Table, Button } from 'antd';
import { useMemo, useState, useCallback } from 'react';
import PlusWhiteIcon from '@/assets/plus-white.svg?react';
import DotsThreeCircleIcon from '@/assets/dots-three-circle.svg?react';
import clsx from 'clsx';

type Props = {
  products: Product[];
  loading?: boolean;
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onAdd?: (id: number) => void;
  onMenu?: (id: number) => void;
};

const formatPricePartsRu = (value: number) => {
  const [intPart, fractionPart = '00'] = value
    .toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .split(',');

  return { intPart, fractionPart };
};

type Row = Product & { key: number };

export const ProductsTable = ({
  products,
  loading,
  page,
  total,
  limit,
  onPageChange,
  onAdd,
  onMenu,
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const dataSource: Row[] = useMemo(() => products.map((p) => ({ ...p, key: p.id })), [products]);

  const toggleRow = useCallback((key: React.Key) => {
    setSelectedRowKeys((prev) => {
      const exists = prev.includes(key);
      return exists ? prev.filter((k) => k !== key) : [...prev, key];
    });
  }, []);

  const columns: ColumnsType<Row> = useMemo(
    () => [
      {
        title: 'Наименование',
        dataIndex: 'title',
        key: 'name',
        className: styles.nameColumn,
        onHeaderCell: () => ({
          className: clsx(styles.nameHeaderCell, styles.headerCell),
        }),
        render: (_, r) => (
          <div className={styles.nameCell}>
            <div className={styles.thumbContainer}>
              {r.thumbnail ? (
                <img className={styles.thumb} src={r.thumbnail} alt="" />
              ) : (
                <div className={styles.thumbPlaceholder} />
              )}
            </div>

            <div className={styles.nameText}>
              <div className={styles.title}>{r.title}</div>
              <div className={styles.sub}>{r.category}</div>
            </div>
          </div>
        ),
      },
      {
        title: 'Вендор',
        dataIndex: 'brand',
        width: '14%',
        key: 'vendor',
        className: styles.vendorCell,
        onHeaderCell: () => ({
          className: clsx(styles.vendorHeaderCell, styles.headerCell),
        }),
        sorter: (a, b) => String(a.brand ?? '').localeCompare(String(b.brand ?? ''), 'ru'),
        render: (v) => v ?? '—',
      },
      {
        title: 'Артикул',
        dataIndex: 'sku',
        key: 'sku',
        width: '14%',
        className: styles.skuCell,
        onHeaderCell: () => ({
          className: clsx(styles.skuHeaderCell, styles.headerCell),
        }),
        sorter: (a, b) => String(a.sku ?? '').localeCompare(String(b.sku ?? ''), 'ru'),
        render: (v) => v ?? '—',
      },
      {
        title: 'Оценка',
        dataIndex: 'rating',
        key: 'rating',
        width: '14%',
        className: styles.ratingCell,
        onHeaderCell: () => ({
          className: clsx(styles.ratingHeaderCell, styles.headerCell),
        }),
        onCell: (record) => ({
          className: clsx(
            styles.ratingCell,
            record.rating < 3 ? styles.ratingCellBad : styles.ratingCellOk,
          ),
        }),
        sorter: (a, b) => (a.rating ?? 0) - (b.rating ?? 0),
        render: (v: number) => (
          <span className={v < 3 ? styles.ratingBad : styles.ratingOk}>
            {v.toFixed(1)}
            <span className={styles.ratingNumber}>/5</span>
          </span>
        ),
      },
      {
        title: 'Цена, ₽',
        dataIndex: 'price',
        key: 'price',
        width: '14%',
        className: styles.priceCell,
        onHeaderCell: () => ({
          className: clsx(styles.priceHeaderCell, styles.headerCell),
        }),
        sorter: (a, b) => (a.price ?? 0) - (b.price ?? 0),
        render: (v: number) => {
          const { intPart, fractionPart } = formatPricePartsRu(v);

          return (
            <span className={styles.priceValue}>
              {intPart}
              <span className={styles.priceFraction}>,{fractionPart}</span>
            </span>
          );
        },
      },
      {
        key: 'add',
        width: 72,
        className: styles.addCell,
        onHeaderCell: () => ({
          className: clsx(styles.addHeaderCell, styles.headerCell),
        }),
        render: (_, r) => (
          <Button
            className={styles.plusButton}
            icon={<PlusWhiteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onAdd?.(r.id);
            }}
          />
        ),
      },
      {
        key: 'menu',
        width: 72,
        className: styles.menuCell,
        onHeaderCell: () => ({
          className: clsx(styles.menuHeaderCell, styles.headerCell),
        }),
        render: (_, r) => (
          <Button
            className={styles.dotsButton}
            icon={<DotsThreeCircleIcon />}
            onClick={(e) => {
              e.stopPropagation();
              onMenu?.(r.id);
            }}
          />
        ),
      },
    ],
    [onAdd, onMenu],
  );

  const onRow: TableProps<Row>['onRow'] = (record) => ({
    onClick: () => toggleRow(record.key),
  });

  const handleSelectionChange = useCallback((keys: React.Key[]) => {
    setSelectedRowKeys(keys);
  }, []);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      onPageChange(nextPage);
    },
    [onPageChange],
  );

  return (
    <div className={styles.tableWrap}>
      <Table<Row>
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
          showTotal: (t, range) => (
            <span className={styles.totalText}>
              Показано{' '}
              <span className={styles.totalStrong}>
                {range[0]}-{range[1]}
              </span>{' '}
              из <span className={styles.totalStrong}>{t}</span>
            </span>
          ),
        }}
      />
    </div>
  );
};
