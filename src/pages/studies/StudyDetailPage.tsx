import { Study } from '@/types/study';
import { FC, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Button } from '@/components/ui/button';
import { Camera, Home, Pencil, Pin } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

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

interface Crew {
  id: number;
  name: string;
  level: number;
}

const crewSample: Crew[] = [
  { id: 1, name: '참여자A', level: 1 },
  { id: 2, name: '참여자B', level: 0 },
  { id: 3, name: '참여자C', level: 2 },
  { id: 4, name: '참여자D', level: 1 },
];

interface Notice {
  title: string;
  content: string;
  createAt: Dayjs;
}

const noticeSample: Notice[] = [
  { title: '정기 모임 알림', content: '장소는 게더타운 시간은 저녁 9시입니다', createAt: dayjs('2025-02-20') },
  { title: '스터디원 모집 완료', content: '정원이 모두 채워졌습니다', createAt: dayjs('2025-02-10') },
];

const StudyDetailPage: FC = () => {
  const [studyDetail, setStudyDetail] = useState<Study | null>();
  const [crewList, setCrewList] = useState<Crew[] | null>();
  const [noticeList, setNoticeList] = useState<Notice[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const [firstResponse, secondResponse] = await Promise.all([getStudyDetail(), getNoticeList()]);

        setStudyDetail(firstResponse.study);
        setCrewList(firstResponse.crew);
        setNoticeList(secondResponse);
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

  const SideMenu = () => {
    return (
      <div className="h-screen w-50 bg-sky-50 p-4 flex flex-col gap-2 rounded-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{studyDetail?.title}</h2>
        </div>

        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => {}}>
          <Home size={20} />
          대시보드
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-2">
          <Pencil size={20} />
          학습 관리
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-2">
          <Camera size={20} />
          라이브 스터디룸
        </Button>

        <div className="flex-1" />

        <div className="border-1 rounded-sm p-2">
          <div className="border-b-1 pb-2">Study Crew</div>
          <div className="flex flex-col gap-2 mt-2">
            {crewList?.map((crew) => <span key={crew.id}>{crew.name}</span>)}
          </div>
        </div>

        <div>스터디 탈퇴</div>
      </div>
    );
  };

  const DashBoard = () => {
    return (
      <div className="flex flex-col w-200 bg-sky-50 p-4 rounded-sm overflow-auto">
        <section className="w-full h-full">
          <Card className="p-4">
            <CardTitle className="flex gap-1 font-bold">
              <Pin size={18} />
              공지사항 {'>'}
            </CardTitle>
            <CardContent className="divide-y-1 p-2">
              {noticeList?.map((notice) => (
                <div className="text-left py-2">
                  <div className="font-bold">{notice.title}</div>
                  <div>{notice.content}</div>
                  <div className="text-right">{notice.createAt.toISOString()}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    );
  };

  const renderDetail = () => {
    return (
      <div className="flex flex-row flex-1 w-full gap-4 min-h-screen">
        <SideMenu />
        <DashBoard />
      </div>
    );
  };

  return (
    <div className="mx-auto">
      {!isLoading && studyDetail ? renderDetail() : <div>데이터를 불러오지 못했습니다.</div>}
    </div>
  );
};

export default StudyDetailPage;
