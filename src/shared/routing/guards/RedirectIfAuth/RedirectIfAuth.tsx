import type { ReactElement } from 'react';
import { useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';
import { $isAuth } from '@/entities/auth/model';

export function RedirectIfAuth({ children }: { children: ReactElement }) {
  const isAuth = useUnit($isAuth);

  if (isAuth) {
    return <Navigate to="/products" replace />;
  }

  return children;
}
