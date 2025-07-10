import { Link } from '@tanstack/react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Button } from '../ui/button';
import { logout } from '@/store/auth/auth.slice';

export function DesktopNavbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="hidden items-center space-x-4 md:flex">
      <ul className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            <li>
              <Link to={'/sign-up'} className="hover:underline">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to={'/login'} className="hover:underline">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/'} className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Button variant="default" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
