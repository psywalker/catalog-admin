import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@/entities/auth/model';
import '@/entities/products/model';

export const App = () => {
  return <RouterProvider router={router} />;
};
