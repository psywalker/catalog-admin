import type { AddProductFieldConfig } from '../model/types';

export const addProductFields: AddProductFieldConfig[] = [
  { key: 'title', label: 'Наименование', required: true, placeholder: '' },
  { key: 'brand', label: 'Вендор', required: true, placeholder: '' },
  { key: 'sku', label: 'Артикул', required: true, placeholder: '' },
  { key: 'rating', label: 'Оценка', required: false, placeholder: '0-5', inputMode: 'decimal' },
  {
    key: 'price',
    label: 'Цена, ₽',
    required: true,
    placeholder: 'Напр. 48652.00',
    inputMode: 'decimal',
  },
];
