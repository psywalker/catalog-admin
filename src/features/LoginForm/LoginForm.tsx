import styles from './LoginForm.module.scss';

import SoundIcon from '@/assets/sound.svg?react';
import UserIcon from '@/assets/user.svg?react';
import LockIcon from '@/assets/lock.svg?react';
import XIcon from '@/assets/x.svg?react';
import EyeOffIcon from '@/assets/eye-off.svg?react';
import EyeIcon from '@/assets/eye.svg?react';

import { Button, Checkbox, Form, Input, Spin } from 'antd';

import { useLoginForm } from './model/useLoginForm';
import type { LoginValues } from './model/types';

export const LoginForm = () => {
  const {
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
  } = useLoginForm();

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
