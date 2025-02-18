import StudyForm from '@/components/StudyForm';
import StudyCarousel from '@/components/StudCarousel';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { Study } from '@/types/study';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const sampleAll: Study[] = Array.from({ length: 12 }).map((_, index) => ({
  title: '스터디' + index,
  description: '스터디 설명' + index,
  userId: index,
  languageId: index % 3,
  categoryId: index % 4,
  createdAt: dayjs('2025-02-0' + (index + 1)),
  startDate: dayjs('2025-02-1' + (index + 1)),
  endDate: dayjs('2025-03-1' + (index + 1)),
  capacity: index * 10,
}));

const sampleMy: Study[] = Array.from({ length: 4 }).map((_, index) => ({
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

const Home: FC = () => {
  const { isAuthenticated } = useAuthStore();
  const [allStudyList, setAllStudyList] = useState<Study[]>([]);
  const [userStudyList, setUserStudyList] = useState<Study[]>([]);

  useEffect(() => {
    setAllStudyList(sampleAll);

    if (isAuthenticated) {
      setUserStudyList(sampleMy);
    }
  }, []);

  const AuthenticatedHome = () => {
    return (
      <div>
        <UserStudyCarousel />
        <AllStudyCarousel />
        <StudyForm />
      </div>
    );
  };

  const UnAuthenticatedHome = () => {
    return (
      <div>
        <AllStudyCarousel />
      </div>
    );
  };

  const AllStudyCarousel = () => {
    return (
      <section>
        <Link to={'/studyList'}>
          <Button variant={'link'}>전체 스터디 목록 {'>'}</Button>
        </Link>
        <StudyCarousel studyList={allStudyList} />
      </section>
    );
  };

  const UserStudyCarousel = () => {
    return (
      <section>
        <Link to={'/myStudyList'}>
          <Button variant={'link'}>내가 참여중인 스터디 목록 {'>'}</Button>
        </Link>
        <StudyCarousel studyList={userStudyList} />
      </section>
    );
  };

  return <div>{isAuthenticated ? <AuthenticatedHome /> : <UnAuthenticatedHome />}</div>;
};

export default Home;
