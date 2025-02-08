export const API_CONFIG = {
  BASE_URL: import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 5000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
} as const;
