import {
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components';
import './LoginFormTextField.module.scss';
import type { ReactNode } from 'react';
import { TextField } from '@react-spectrum/s2';
import styles from './LoginFormTextField.module.scss';

export interface LoginFormTextFieldProps extends AriaTextFieldProps {
  label?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: string;
  onChange?: (value: string) => void;
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
}

export const LoginFormTextField = ({
  label,
  leftIcon,
  rightIcon,
  name,
  onChange,
  ...props
}: LoginFormTextFieldProps) => (
  <div>
    {leftIcon}
    <TextField
      label={label}
      onChange={onChange}
      name={name}
      UNSAFE_className={styles.input}
      {...props}
    />
    {rightIcon}
  </div>
);
