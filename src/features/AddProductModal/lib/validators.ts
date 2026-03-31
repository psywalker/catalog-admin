import type { RuleObject } from 'antd/es/form';
import { toNumber, toTrimmed } from './normalizers';

export const validatePrice = async (_rule: RuleObject, value: unknown): Promise<void> => {
  const raw = toTrimmed(value);

  if (!raw) return;

  const num = toNumber(value);

  if (Number.isNaN(num) || num <= 0) {
    throw new Error('Введите цену > 0');
  }
};

export const validateRating = async (_rule: RuleObject, value: unknown): Promise<void> => {
  const raw = toTrimmed(value);

  if (!raw) return;

  const num = toNumber(value);

  if (Number.isNaN(num) || num < 0 || num > 5) {
    throw new Error('Оценка должна быть от 0 до 5');
  }
};
