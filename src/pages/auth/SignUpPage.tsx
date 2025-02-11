import InputContainer from '@/components/InputContainer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupFormValues, signupSchema as signupSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

const SignUpPage: FC = () => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    console.log('회원가입', values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>회원가입</CardTitle>
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

            {/* 비밀번호 확인인 */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <InputContainer label="Confirm Password">
                  <Input placeholder="********" type="password" {...field} />
                </InputContainer>
              )}
            />

            <Button type="submit">회원가입</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
