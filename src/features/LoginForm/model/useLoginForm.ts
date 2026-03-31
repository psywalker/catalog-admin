import { useCallback, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { loginFx } from '@/entities/auth/model';
import type { FieldErrors, LoginValues } from './types';

export const useLoginForm = () => {
  const navigate = useNavigate();
  const loginPending = useUnit(loginFx.pending);
  const [form] = Form.useForm<LoginValues>();
  const [showPassword, setShowPassword] = useState(false);

  const clearFieldError = useCallback(
    (name: keyof LoginValues) => {
      form.setFields([{ name, errors: [] }]);
    },
    [form],
  );

  const clearUsername = useCallback(() => {
    form.setFieldsValue({ username: '' });
    form.setFields([{ name: 'username', errors: [] }]);
  }, [form]);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        clearFieldError('username');
      }
    },
    [clearFieldError],
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        clearFieldError('password');
      }
    },
    [clearFieldError],
  );

  const handleClearUsernameKeyDown = useCallback(
    (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clearUsername();
      }
    },
    [clearUsername],
  );

  const handleTogglePasswordKeyDown = useCallback(
    (e: KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePassword();
      }
    },
    [togglePassword],
  );

  const onFinish = useCallback(
    async (values: LoginValues) => {
      const username = values.username?.trim() ?? '';
      const password = values.password?.trim() ?? '';

      const fieldErrors: FieldErrors = [];

      if (!username) {
        fieldErrors.push({ name: 'username', errors: ['Обязательное поле'] });
      }

      if (!password) {
        fieldErrors.push({ name: 'password', errors: ['Обязательное поле'] });
      }

      if (fieldErrors.length) {
        form.setFields(fieldErrors);
        return;
      }

      try {
        await loginFx({
          username,
          password,
          remember: Boolean(values.remember),
        });

        navigate('/products', { replace: true });
      } catch {
        message.error({ content: 'Неверный логин или пароль', duration: 2 });

        form.setFields([
          { name: 'username', errors: [] },
          { name: 'password', errors: [] },
        ]);
      }
    },
    [form, navigate],
  );

  return {
    form,
    loginPending,
    showPassword,
    clearUsername,
    togglePassword,
    handleUsernameChange,
    handlePasswordChange,
    handleClearUsernameKeyDown,
    handleTogglePasswordKeyDown,
    onFinish,
  };
};
