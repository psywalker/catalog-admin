import { Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';

import PlusWhiteIcon from '@/assets/plus-white.svg?react';
import DotsThreeCircleIcon from '@/assets/dots-three-circle.svg?react';
import { formatPricePartsRu } from '@/entities/products/lib/formatPricePartsRu';
import type { GetProductsTableColumnsParams, ProductTableRow } from '../model/types';

export const getProductsTableColumns = ({
  styles,
  onAdd,
  onMenu,
}: GetProductsTableColumnsParams): ColumnsType<ProductTableRow> => [
  {
    title: 'Наименование',
    dataIndex: 'title',
    key: 'name',
    className: styles.nameColumn,
    onHeaderCell: () => ({
      className: clsx(styles.nameHeaderCell, styles.headerCell),
    }),
    render: (_, record) => (
      <div className={styles.nameCell}>
        <div className={styles.thumbContainer}>
          {record.thumbnail ? (
            <img className={styles.thumb} src={record.thumbnail} alt="" />
          ) : (
            <div className={styles.thumbPlaceholder} />
          )}
        </div>

        <div className={styles.nameText}>
          <div className={styles.title}>{record.title}</div>
          <div className={styles.sub}>{record.category}</div>
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
    render: (value) => value ?? '—',
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
    render: (value) => value ?? '—',
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
    render: (value: number) => (
      <span className={value < 3 ? styles.ratingBad : styles.ratingOk}>
        {value.toFixed(1)}
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
    render: (value: number) => {
      const { intPart, fractionPart } = formatPricePartsRu(value);

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
    render: (_, record) => (
      <Button
        className={styles.plusButton}
        icon={<PlusWhiteIcon />}
        onClick={(e) => {
          e.stopPropagation();
          onAdd?.(record.id);
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
    render: (_, record) => (
      <Button
        className={styles.dotsButton}
        icon={<DotsThreeCircleIcon />}
        onClick={(e) => {
          e.stopPropagation();
          onMenu?.(record.id);
        }}
      />
    ),
  },
];
