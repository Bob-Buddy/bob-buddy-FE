import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/auth/signin">로그인</Link>
        <Link to="/auth/signup">회원가입</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
