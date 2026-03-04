import { useUnit } from 'effector-react';
import { Navigate, useLocation } from 'react-router-dom';

import { $isAuth } from '@/entities/auth/model';

type RequireAuthProps = {
  children: JSX.Element;
};

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuth = useUnit($isAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};
