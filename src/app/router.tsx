import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { ProductsPage } from '@/pages/ProductsPage/ProductsPage';
import { RequireAuth } from '@/shared/routing/guards/RequireAuth';
import { RedirectIfAuth } from '@/shared/routing/guards/RedirectIfAuth';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/products" replace /> },
  {
    path: '/login',
    element: (
      <RedirectIfAuth>
        <LoginPage />
      </RedirectIfAuth>
    ),
  },
  {
    path: '/products',
    element: (
      <RequireAuth>
        <ProductsPage />
      </RequireAuth>
    ),
  },
]);
