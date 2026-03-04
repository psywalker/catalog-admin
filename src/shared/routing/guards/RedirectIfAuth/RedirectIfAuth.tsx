import { useUnit } from 'effector-react';
import { Navigate } from 'react-router-dom';

import { $isAuth } from '@/entities/auth/model';

type RedirectIfAuthProps = {
  children: JSX.Element;
};

export const RedirectIfAuth = ({ children }: RedirectIfAuthProps) => {
  const isAuth = useUnit($isAuth);

  if (isAuth) {
    return <Navigate to="/products" replace />;
  }

  return children;
};
