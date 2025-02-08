import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const DefaultLayout: FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  return (
    <div>
      <nav>
        <Link to="/">
          <Button variant={'ghost'}>홈</Button>
        </Link>
        {isAuthenticated ? (
          <>
            <Button variant={'ghost'} onClick={logout}>
              로그아웃
            </Button>
            <span>
              <span style={{ fontWeight: 700 }}>{user?.name}</span>님
            </span>
          </>
        ) : (
          <Link to="/auth/login">
            <Button variant={'ghost'}>로그인</Button>
          </Link>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
