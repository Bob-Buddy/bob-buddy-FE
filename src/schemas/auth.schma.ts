import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다').max(100, '비밀번호가 너무 깁니다'),
});

export const signupSchma = z
  .object({
    email: z.string().email('올바른 이메일을 입력해주세요'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다').max(100, '비밀번호가 너무 깁니다'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchma>;
