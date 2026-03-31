import styles from './LoginPage.module.scss';
import { LoginForm } from '@/features/LoginForm';

export const LoginPage = () => (
  <div className={styles.container}>
    <LoginForm />
  </div>
);
