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
