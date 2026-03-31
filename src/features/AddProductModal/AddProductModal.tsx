import { useCallback, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import type { RuleObject } from 'antd/es/form';

import styles from './AddProductModal.module.scss';
import PlusIcon from '@/assets/plus.svg?react';
import { addProductFields } from './config/fields';
import { toNumber } from './lib/normalizers';
import { validatePrice, validateRating } from './lib/validators';
import { useAddProductModal } from './model/useAddProductModal';
import type { AddProductModalFormValues, AddProductModalProps } from './model/types';

export const AddProductModal = ({ isDisabled }: AddProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<AddProductModalFormValues>();
  const { isSubmitting, handleSubmit } = useAddProductModal();

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    if (isSubmitting) return;

    form.resetFields();
    setOpen(false);
  }, [form, isSubmitting]);

  const onFinish = useCallback(
    async (values: AddProductModalFormValues) => {
      await handleSubmit({
        title: values.title.trim(),
        brand: values.brand.trim(),
        sku: values.sku.trim(),
        rating: values.rating?.trim() ? toNumber(values.rating) : 0,
        price: toNumber(values.price),
      });

      form.resetFields();
      setOpen(false);
    },
    [form, handleSubmit],
  );

  return (
    <div className={styles.container}>
      <Button
        type="primary"
        icon={<PlusIcon />}
        onClick={openModal}
        disabled={isDisabled}
        className={styles.addButton}
      >
        Добавить
      </Button>

      <Modal
        title="Добавить товар"
        open={open}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        okText="Добавить"
        cancelText="Отмена"
        destroyOnHidden
        confirmLoading={Boolean(isSubmitting)}
        maskClosable={!isSubmitting}
        keyboard={!isSubmitting}
      >
        <Form<AddProductModalFormValues>
          form={form}
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
          disabled={Boolean(isSubmitting)}
        >
          {addProductFields.map((field) => {
            const rules: RuleObject[] = [];

            if (field.required) {
              rules.push({ required: true, whitespace: true, message: 'Обязательное поле' });
            }

            if (field.key === 'price') {
              rules.push({ validator: validatePrice });
            }

            if (field.key === 'rating') {
              rules.push({ validator: validateRating });
            }

            return (
              <Form.Item<AddProductModalFormValues>
                key={field.key}
                label={field.label}
                name={field.key}
                validateTrigger="onSubmit"
                rules={rules}
              >
                <Input placeholder={field.placeholder} inputMode={field.inputMode} />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
};
