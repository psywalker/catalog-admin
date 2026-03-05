import { LoginForm } from '@/features/LoginForm';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
