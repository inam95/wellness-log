import { Link } from '@tanstack/react-router';

export function DesktopNavbar() {
  return (
    <nav className="hidden items-center space-x-4 md:flex">
      <ul className="flex items-center space-x-4">
        <li>
          <Link to={'/'} className="hover:underline">
            Home
          </Link>
        </li>
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
      </ul>
    </nav>
  );
}
