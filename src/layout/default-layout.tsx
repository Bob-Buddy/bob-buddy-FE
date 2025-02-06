import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout: FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <Button variant={'ghost'}>홈</Button>
        </Link>
        <Link to="/auth/signin">
          <Button variant={'ghost'}>로그인</Button>
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
