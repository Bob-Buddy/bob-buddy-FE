import MainPage from '../pages/MainPage';
import DefaultLayout from '../layout/default-layout';

export const defaultRoutes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
];
