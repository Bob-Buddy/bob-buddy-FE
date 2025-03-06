import { Button } from '@/components/ui/button';
import { FC, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import dayjs from 'dayjs';
import { Crew, Notice, Problem, Study, StudyContextType } from '@/types/study';
import SideMenu from '@/components/SideMenu';

const studySample: Study = {
  title: '스터디A',
  description: '스터디 설명',
  userId: 1,
  languageId: 1,
  categoryId: 2,
  createdAt: dayjs('2025-02-01'),
  startDate: dayjs('2025-02-10'),
  endDate: dayjs('2025-03-10'),
  capacity: 10,
};

const crewSample: Crew[] = [
  { id: 1, name: '참여자A', level: 1 },
  { id: 2, name: '참여자B', level: 0 },
  { id: 3, name: '참여자C', level: 2 },
  { id: 4, name: '참여자D', level: 1 },
];

const noticeSample: Notice[] = [
  { title: '정기 모임 알림', content: '장소는 게더타운 시간은 저녁 9시입니다', createAt: dayjs('2025-02-20') },
  { title: '스터디원 모집 완료', content: '정원이 모두 채워졌습니다', createAt: dayjs('2025-02-10') },
];

const problemSample: Problem[] = [
  { id: 1, title: '[백준] 123', solutionCount: 2, createAt: dayjs('2025-02-28') },
  { id: 2, title: '[프로그래머스] 111', solutionCount: 0, createAt: dayjs('2025-03-03') },
];

const StudyLayout: FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const [studyDetail, setStudyDetail] = useState<Study | null>();
  const [crewList, setCrewList] = useState<Crew[] | null>();
  const [noticeList, setNoticeList] = useState<Notice[] | null>();
  const [problemList, setProblemList] = useState<Problem[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
          getStudyDetail(),
          getNoticeList(),
          getProblemList(),
        ]);

        setStudyDetail(firstResponse.study);
        setCrewList(firstResponse.crew);
        setNoticeList(secondResponse);
        setProblemList(thirdResponse);
      } catch (error) {
        console.error('Fail-fetch data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getStudyDetail = async () => {
    const response = { study: studySample, crew: crewSample }; // await studyApi.getList();
    return response;
  };

  const getNoticeList = async () => {
    const response = { notice: noticeSample };
    return response.notice;
  };

  const getProblemList = async () => {
    const response = { problem: problemSample };
    return response.problem;
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <Button variant={'ghost'}>홈</Button>
        </Link>
        {isAuthenticated ? (
          <>
            <Button variant={'ghost'} onClick={logout}>
              로그아웃
            </Button>
            <span>
              <span style={{ fontWeight: 700 }}>{user?.name}</span>님
            </span>
          </>
        ) : (
          <Link to="/auth/login">
            <Button variant={'ghost'}>로그인</Button>
          </Link>
        )}
      </nav>
      <main>
        <div className="flex flex-1 flex-row w-full gap-4">
          {!isLoading && studyDetail && crewList && (
            <>
              <SideMenu studyTitle={studyDetail?.title} crewList={crewList} />
              <Outlet context={{ studyDetail, crewList, noticeList, problemList } as StudyContextType} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudyLayout;
