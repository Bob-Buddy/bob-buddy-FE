import { apiClient } from './client';
import { Study } from '@/types/study';

interface StudyResponse {
  study: Study[];
}

export const studyApi = {
  getList: () => {
    return apiClient.get<StudyResponse>('/study/list');
  },
  // 다른 스터디 관련 API 호출들...
};
