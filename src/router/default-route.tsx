import MainPage from '../pages/MainPage';
import DefaultLayout from '../layout/default-layout';
import StudyListPage from '@/pages/studies/StudyListPage';
import MyStudyListPage from '@/pages/studies/MyStudyListPage';

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
        path: 'studyList',
        element: <StudyListPage />,
      },
      {
        path: 'myStudyList',
        element: <MyStudyListPage />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
];
