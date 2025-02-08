type RequestInterceptor = (config: RequestInit) => RequestInit;
type ResponseInterceptor = (response: Response) => Promise<any>;

export const requestInterceptors: RequestInterceptor[] = [
  (config) => {
    // 토큰이 필요한 경우 헤더에 추가
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
];

export const responseInterceptors: ResponseInterceptor[] = [
  async (response) => {
    if (!response.ok) {
      // 401 에러 처리
      if (response.status === 401) {
        // 로그아웃 처리 또는 토큰 갱신 로직
        sessionStorage.removeItem('token');
        window.location.href = '/auth/login';
      }

      // 에러 응답 처리
      const errorData = await response.json();
      throw new Error(errorData.message || '서버 에러가 발생했습니다.');
    }

    return response.json();
  },
];
