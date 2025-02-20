import { createBrowserRouter } from 'react-router-dom';
import IndexLayout from '../layout/index-layout';
import { defaultRoutes } from './default-route';
import { authRoutes } from './auth-route';
import { studyRoutes } from './study-route';

const router = createBrowserRouter([
  {
    element: <IndexLayout />,
    children: [...defaultRoutes, ...authRoutes, ...studyRoutes],
  },
]);

export default router;
