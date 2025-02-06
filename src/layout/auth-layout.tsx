import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthLayout: FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <Button variant={'ghost'}>홈</Button>
        </Link>
        <Link to="/auth/signin">
          <Button variant={'ghost'}>로그인</Button>
        </Link>
        <Link to="/auth/signup">
          <Button variant={'ghost'}>회원가입</Button>
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
