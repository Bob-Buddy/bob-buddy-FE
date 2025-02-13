import { z } from 'zod';

export const studySchema = z
  .object({
    title: z.string().trim().min(1, '스터디 제목을 입력해주세요'),
    description: z.string().trim().min(1, '스터디 내용을 입력해주세요'),
    language: z.coerce.number().refine((val) => val !== 0, {
      message: '프로그래밍 언어를 선택해주세요',
    }),
    category: z.coerce.number().refine((val) => val !== 0, {
      message: '카테고리를 선택해주세요',
    }),
    startDate: z.date(),
    endDate: z.date(),
    capacity: z.coerce.number().min(1, '최소 인원은 1입니다'),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 날짜만 비교
      const startDate = new Date(data.startDate);
      startDate.setHours(0, 0, 0, 0);

      return startDate >= today;
    },
    {
      message: '시작일은 오늘 이후여야 합니다',
      path: ['startDate'], // 에러를 특정 필드에 연결
    }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      return endDate >= startDate;
    },
    {
      message: '종료일은 시작일 이후여야 합니다',
      path: ['endDate'],
    }
  );

export type StudyFormValues = z.infer<typeof studySchema>;
