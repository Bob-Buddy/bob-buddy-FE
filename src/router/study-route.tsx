import StudyLayout from '@/layout/study-layout';
import StudyDetailPage from '@/pages/studies/StudyDetailPage';

export const studyRoutes = [
  {
    path: 'study',
    element: <StudyLayout />,
    children: [
      // {
      //   path: 'studyList',
      //   element: <StudyListPage />,
      // },
      // {
      //   path: 'myStudyList',
      //   element: <MyStudyListPage />,
      // },
      {
        path: 'detail',
        element: <StudyDetailPage />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>,
      },
    ],
  },
];
