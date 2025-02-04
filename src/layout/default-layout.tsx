import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout: FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/auth/signin">로그인</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
