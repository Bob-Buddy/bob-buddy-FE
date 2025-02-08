import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schma';
import { ReactNode, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/useAuthStore';
// import { authApi } from '@/lib/api/auth';

interface InputContainerProp {
  label: string;
  children: ReactNode;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = { token: 'token', user: { name: 'asdf', email: 'asdf@gmail.com' } }; // await authApi.login(values);

      sessionStorage.setItem('token', response.token);

      // 유저 정보와 로그인 상태 업데이트
      login(response.user);

      console.log('로그인 성공:', values);
      console.log('자동로그인여부', isAutoLogin);

      if (isAutoLogin) {
        // 자동로그인의 경우 localStorage에 저장
        localStorage.setItem('token', response.token);
      }

      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const InputContainer = ({ label, children }: InputContainerProp) => {
    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>{children}</FormControl>
        <FormMessage />
      </FormItem>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* email 입력 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <InputContainer label="E-mail">
                  <Input placeholder="id@example.com" type="email" {...field} />
                </InputContainer>
              )}
            />

            {/* 비밀번호 입력 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <InputContainer label="Password">
                  <Input placeholder="********" type="password" {...field} />
                </InputContainer>
              )}
            />

            <div>
              <Switch id="auto-login" onCheckedChange={setIsAutoLogin} checked={isAutoLogin} />
              <Label htmlFor="auto-login">자동로그인</Label>
            </div>

            <Button type="submit">{isLoading ? '로그인 중...' : '로그인'}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
