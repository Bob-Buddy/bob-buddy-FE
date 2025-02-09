import { Study } from '@/types/study';
import { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import StudyItem from '@/components/StudyItem';

const sample: Study[] = Array.from({ length: 8 }).map((_, index) => ({
  title: '내 스터디' + index,
  description: '스터디 설명' + index,
  userId: index,
  languageId: index % 3,
  categoryId: index % 4,
  createdAt: dayjs('2025-02-0' + (index + 1)),
  startDate: dayjs('2025-02-1' + (index + 1)),
  endDate: dayjs('2025-03-1' + (index + 1)),
  capacity: index * 10,
}));

const MyStudyListPage: FC = () => {
  const [studyList, setStudyList] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getStudyList();
  }, []);

  const getStudyList = async () => {
    setIsLoading(true);
    const response = { study: sample }; // await studyApi.getList();
    setStudyList(response.study);
    setIsLoading(false);
  };

  return (
    <div>
      <div>내가 참여중인 스터디 목록</div>
      {!isLoading && studyList.map((study, index) => <StudyItem study={study} key={index} />)}
    </div>
  );
};

export default MyStudyListPage;
