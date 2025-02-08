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

interface InputContainerProp {
  label: string;
  children: ReactNode;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    console.log(values);
    navigate('/');
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
            {/* email 입력력 */}
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

            <Button type="submit">로그인</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
