import { LoginForm } from '@/features/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage = () => (
  <div className={styles.container}>
    <LoginForm />
  </div>
);
