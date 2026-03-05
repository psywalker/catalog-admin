import SoundIcon from '@/assets/sound.svg?react';
import UserIcon from '@/assets/user.svg?react';
import XIcon from '@/assets/x.svg?react';
import LockIcon from '@/assets/lock.svg?react';
import EyeOffIcon from '@/assets/eye-off.svg?react';
import { LoginFormTextField } from './components/LoginFormTextField';
import { loginFx } from '@/entities/auth/model';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
  Form,
  Button,
  Checkbox,
  ToastContainer,
  ToastQueue,
  ProgressCircle,
} from '@react-spectrum/s2';
import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  const navigate = useNavigate();

  const loginPending = useUnit(loginFx.pending);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFieldErrors({ username: '', password: '' });

      const nextErrors: typeof fieldErrors = {};
      if (!username.trim()) nextErrors.username = 'Обязательное поле';
      if (!password.trim()) nextErrors.password = 'Обязательное поле';

      setFieldErrors(nextErrors);
      if (nextErrors.username || nextErrors.password) return;

      try {
        await loginFx({ username: username.trim(), password, remember });
        navigate('/products');
      } catch {
        ToastQueue.negative('Неверный логин или пароль', {
          timeout: 2000,
        });
      }
    },
    [username, password, remember, navigate],
  );

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <SoundIcon aria-label="Sound" />
      </div>
      <div>
        <h1 className={styles.title}>Добро пожаловать</h1>
        <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
      </div>
      <Form onSubmit={onSubmit}>
        <LoginFormTextField
          label="Логин"
          leftIcon={<UserIcon />}
          rightIcon={<XIcon />}
          errorMessage="Неправильный логин"
          isInvalid={Boolean(fieldErrors.username)}
          slot={null}
          onChange={setUsername}
          onInput={() => {
            setFieldErrors({ username: '', password: fieldErrors.password });
          }}
        />

        <LoginFormTextField
          label="Пароль"
          leftIcon={<LockIcon />}
          rightIcon={<EyeOffIcon onClick={() => setIsShowPassword(!isShowPassword)} />}
          isInvalid={Boolean(fieldErrors.password)}
          errorMessage="Неправильный пароль"
          type={isShowPassword ? 'text' : 'password'}
          slot={null}
          onInput={() => {
            setFieldErrors({ password: '', username: fieldErrors.username });
          }}
          onChange={setPassword}
        />
        <Checkbox onChange={setRemember}>Запомнить данные</Checkbox>
        <Button type="submit">Войти</Button>
      </Form>
      <p>Или</p>
      <p>
        Нет аккаунта? <a href="#">Создать</a>
      </p>
      <ProgressCircle
        UNSAFE_className={styles.spinner}
        UNSAFE_style={{ display: loginPending ? 'grid' : 'none' }}
        aria-label="Loading…"
        value={29}
        isIndeterminate
        size="L"
        staticColor="black"
      />
      <ToastContainer placement="bottom" />
    </div>
  );
};
