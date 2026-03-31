import type { LoginCommand } from '@/entities/auth/model/types';

export type LoginValues = LoginCommand;

export type FieldErrors = {
  name: keyof LoginValues;
  errors: string[];
}[];
