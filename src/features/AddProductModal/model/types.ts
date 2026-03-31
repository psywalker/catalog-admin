import type { HTMLAttributes } from 'react';

export type AddProductModalFormValues = {
  title: string;
  brand: string;
  sku: string;
  rating?: string;
  price: string;
};

export type AddProductFieldKey = keyof AddProductModalFormValues;

export type AddProductFieldConfig = {
  key: AddProductFieldKey;
  label: string;
  required: boolean;
  placeholder?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
};

export type AddProductModalProps = {
  isDisabled?: boolean;
};
