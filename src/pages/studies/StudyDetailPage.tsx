import { Crew, StudyContextType } from '@/types/study';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Notebook, Pin, Trophy } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import ChartComponent from '@/components/ChartComponent';
import { useOutletContext } from 'react-router-dom';

const StudyDetailPage: FC = () => {
  const { studyDetail, crewList, noticeList, problemList } = useOutletContext<StudyContextType>();

  const DashBoard = () => {
    return (
      <div className="flex flex-col w-200 bg-sky-50 p-4 rounded-sm overflow-auto gap-6">
        <section className="w-full">
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

        <section>
          <Card className="p-4">
            <CardTitle className="flex gap-1 font-bold">
              <Trophy size={18} />
              리더보드
            </CardTitle>
            <CardContent className="divide-y-1 p-2">
              <Chart />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="p-4">
            <CardTitle className="flex justify-between">
              <div className="flex gap-1 font-bold">
                <Notebook size={18} />
                문제 {'>'}
              </div>
              <div>
                <Button>문제 등록</Button>
              </div>
            </CardTitle>
            <CardContent className="divide-y-1 p-2">
              {problemList?.map((notice) => (
                <div className="text-left py-2">
                  <div className="font-bold">{notice.title}</div>
                  {notice.solutionCount > 0 ? (
                    <div>총 {notice.solutionCount}개의 코드가 등록되어있습니다.</div>
                  ) : (
                    <div>아직 등록된 코드가 없습니다. 가장 먼저 코드를 등록해보세요.</div>
                  )}
                  <div className="text-right">{notice.createAt.toISOString()}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    );
  };

  const Chart = () => {
    const crewData = crewList?.reduce(
      (acc, item) => {
        (Object.keys(item) as Array<keyof Crew>).forEach((key) => {
          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(item[key]);
        });

        return acc;
      },
      {} as Record<keyof Crew, (string | number)[]>
    ) ?? { id: [], name: [], level: [] };

    return (
      <div>
        <ChartComponent labels={crewData.name as string[]} datasets={crewData.level as number[]} title="레벨" />
      </div>
    );
  };

  const renderDetail = () => {
    return <DashBoard />;
  };

  return <div className="mx-auto">{studyDetail ? renderDetail() : <div>데이터를 불러오지 못했습니다.</div>}</div>;
};

export default StudyDetailPage;
