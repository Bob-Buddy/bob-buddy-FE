import { Dayjs } from 'dayjs';

export interface Study {
  title: string;
  description: string;
  userId: number;
  languageId: number;
  categoryId: number;
  createdAt: Dayjs;
  startDate: Dayjs;
  endDate: Dayjs;
  capacity: number;
  // 필요한 다른 스터디 정보들 추가
}

export interface Crew {
  id: number;
  name: string;
  level: number;
}

export interface Notice {
  title: string;
  content: string;
  createAt: Dayjs;
}

export interface Problem {
  id: number;
  title: string;
  solutionCount: number;
  createAt: Dayjs;
}

export interface StudyContextType {
  studyDetail: Study;
  crewList: Crew[];
  noticeList: Notice[];
  problemList: Problem[];
}
