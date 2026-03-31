import { useCallback } from 'react';
import { message } from 'antd';
import { useUnit } from 'effector-react';

import { addProductFx, $isAdding, type NewProductPayload } from '@/entities/products/model';

export const useAddProductModal = () => {
  const { isSubmitting, addProduct } = useUnit({
    isSubmitting: $isAdding,
    addProduct: addProductFx,
  });

  const handleSubmit = useCallback(
    async (payload: NewProductPayload) => {
      await addProduct(payload);
      message.success({ content: 'Товар добавлен', duration: 2 });
    },
    [addProduct],
  );

  return {
    isSubmitting,
    handleSubmit,
  };
};
