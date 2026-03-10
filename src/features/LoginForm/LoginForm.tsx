import styles from './LoginForm.module.scss';

import SoundIcon from '@/assets/sound.svg?react';
import UserIcon from '@/assets/user.svg?react';
import LockIcon from '@/assets/lock.svg?react';
import XIcon from '@/assets/x.svg?react';
import EyeOffIcon from '@/assets/eye-off.svg?react';
import EyeIcon from '@/assets/eye.svg?react';

import { loginFx } from '@/entities/auth/model';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';

type LoginValues = {
  username: string;
  password: string;
  remember: boolean;
};

type FieldErrors = { name: keyof LoginValues; errors: string[] }[];

export const LoginForm = () => {
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        clearFieldError('username');
      }
    },
    [clearFieldError],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        clearFieldError('password');
      }
    },
    [clearFieldError],
  );

  const handleClearUsernameKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clearUsername();
      }
    },
    [clearUsername],
  );

  const handleTogglePasswordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLSpanElement>) => {
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
      } catch (e) {
        message.error({ content: 'Неверный логин или пароль', duration: 2 });

        form.setFields([
          { name: 'username', errors: [] },
          { name: 'password', errors: [] },
        ]);

        console.log(e);
      }
    },
    [form, navigate],
  );

  return (
    <div className={styles.container}>
      <div className={styles.credits}>
        <p>Логин: emilys</p>
        <p>Пароль: emilyspass</p>
      </div>
      {loginPending ? <Spin spinning fullscreen description="Загрузка..." /> : null}

      <div className={styles.imgContainer}>
        <SoundIcon aria-label="Sound" />
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Добро пожаловать!</h1>
        <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
      </div>

      <Form<LoginValues>
        form={form}
        layout="vertical"
        className={styles.form}
        initialValues={{ username: '', password: '', remember: false }}
        onFinish={onFinish}
        disabled={loginPending}
        requiredMark={false}
      >
        <Form.Item
          label="Логин"
          name="username"
          validateTrigger="onSubmit"
          rootClassName={styles.inputRoot}
          rules={[{ required: true, whitespace: true, message: 'Обязательное поле' }]}
        >
          <Input
            prefix={<UserIcon className={styles.inputPrefixIcon} />}
            autoComplete="username"
            className={styles.inputLogin}
            onChange={handleUsernameChange}
            suffix={
              <span
                className={styles.inputSuffixIcon}
                onClick={clearUsername}
                onKeyDown={handleClearUsernameKeyDown}
                role="button"
                tabIndex={0}
              >
                <XIcon />
              </span>
            }
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          validateTrigger="onSubmit"
          rootClassName={styles.inputRoot}
          prefixCls={styles.inputPrefix}
          rules={[{ required: true, whitespace: true, message: 'Обязательное поле' }]}
        >
          <Input
            prefix={<LockIcon className={styles.inputPrefixIcon} />}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            className={styles.inputPassword}
            onChange={handlePasswordChange}
            suffix={
              <span
                className={styles.inputSuffixIcon}
                onClick={togglePassword}
                onKeyDown={handleTogglePasswordKeyDown}
                role="button"
                tabIndex={0}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </span>
            }
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className={styles.inputItem}>
          <Checkbox className={styles.checkbox}>Запомнить данные</Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loginPending}
          className={styles.button}
        >
          Войти
        </Button>
      </Form>

      <p className={styles.or}>или</p>
      <p className={styles.signup}>
        Нет аккаунта?{' '}
        <a href="#" className={styles.signupLink}>
          Создать
        </a>
      </p>
    </div>
  );
};
