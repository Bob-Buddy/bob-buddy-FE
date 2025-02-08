import { API_CONFIG } from '@/config/constants';
import { requestInterceptors, responseInterceptors } from './interceptors';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.name === 'AbortError') {
      return '요청 시간이 초과되었습니다.';
    }
    return error.message;
  }
  return String(error);
}

class ApiClient {
  private async fetch<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const timeout = options.timeout || API_CONFIG.TIMEOUT;

    // Request Interceptors 적용
    let config = { ...options };
    for (const interceptor of requestInterceptors) {
      config = interceptor(config);
    }

    // Timeout 설정
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
        ...config,
        headers: {
          ...API_CONFIG.DEFAULT_HEADERS,
          ...config.headers,
        },
        signal: controller.signal,
      });

      // Response Interceptors 적용
      let data = response;
      for (const interceptor of responseInterceptors) {
        data = await interceptor(data);
      }

      return data as T;
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      throw new Error(message);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // HTTP 메서드별 헬퍼 함수들
  async get<T>(url: string, options?: FetchOptions) {
    return this.fetch<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, data?: any, options?: FetchOptions) {
    return this.fetch<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(url: string, data?: any, options?: FetchOptions) {
    return this.fetch<T>(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(url: string, options?: FetchOptions) {
    return this.fetch<T>(url, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
