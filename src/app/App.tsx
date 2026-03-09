import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import '@/entities/auth/model';

export function App() {
  return <RouterProvider router={router} />;
}
