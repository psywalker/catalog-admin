import { useCallback, useMemo, useState } from 'react';
import styles from './AddProductModal.module.scss';

import { Button, Form, Input, Modal } from 'antd';
import type { RuleObject } from 'antd/es/form';
import PlusIcon from '@/assets/plus.svg?react';

export type NewProductPayload = {
  id: number;
  category: string;
  title: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
};

type FormValues = {
  title: string;
  brand: string;
  sku: string;
  rating?: string;
  price: string;
};

interface AddProductModalProps {
  onSubmit: (data: NewProductPayload) => void | Promise<void>;
  isDisabled?: boolean;
  isSubmitting?: boolean;
}

type InputMode = React.HTMLAttributes<HTMLInputElement>['inputMode'];

type FieldKey = keyof FormValues;

type FieldConfig = {
  key: FieldKey;
  label: string;
  required: boolean;
  placeholder?: string;
  inputMode?: InputMode;
};

const toNumber = (v: unknown): number => Number(String(v ?? '').replace(',', '.'));
const toTrimmed = (v: unknown): string => String(v ?? '').trim();

export const AddProductModal = ({ onSubmit, isDisabled, isSubmitting }: AddProductModalProps) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<FormValues>();

  const fields = useMemo<FieldConfig[]>(
    () => [
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
    ],
    [],
  );

  const openModal = useCallback(() => setOpen(true), []);

  const handleCancel = useCallback(() => {
    if (isSubmitting) return;
    form.resetFields();
    setOpen(false);
  }, [form, isSubmitting]);

  const onFinish = useCallback(
    async (values: FormValues) => {
      const payload: NewProductPayload = {
        id: Date.now(),
        category: 'No category',
        title: values.title.trim(),
        brand: values.brand.trim(),
        sku: values.sku.trim(),
        rating: values.rating?.trim() ? toNumber(values.rating) : 0,
        price: toNumber(values.price),
      };

      await onSubmit(payload);

      form.resetFields();
      setOpen(false);
    },
    [form, onSubmit],
  );

  const validatePrice = useCallback(async (_rule: RuleObject, value: unknown): Promise<void> => {
    const raw = toTrimmed(value);
    if (!raw) return;

    const num = toNumber(value);
    if (Number.isNaN(num) || num <= 0) throw new Error('Введите цену > 0');
  }, []);

  const validateRating = useCallback(async (_rule: RuleObject, value: unknown): Promise<void> => {
    const raw = toTrimmed(value);
    if (!raw) return;

    const num = toNumber(value);
    if (Number.isNaN(num) || num < 0 || num > 5) throw new Error('Оценка должна быть от 0 до 5');
  }, []);

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
        <Form<FormValues>
          form={form}
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
          disabled={Boolean(isSubmitting)}
        >
          {fields.map((f) => {
            const name = f.key;

            const rules: RuleObject[] = [];

            if (f.required) {
              rules.push({ required: true, whitespace: true, message: 'Обязательное поле' });
            }

            if (name === 'price') rules.push({ validator: validatePrice });
            if (name === 'rating') rules.push({ validator: validateRating });

            return (
              <Form.Item<FormValues>
                key={name}
                label={f.label}
                name={name}
                validateTrigger="onSubmit"
                rules={rules}
              >
                <Input placeholder={f.placeholder} inputMode={f.inputMode} />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
};
