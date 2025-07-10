import { Link } from '@tanstack/react-router';
import { DesktopNavbar } from './desktop-navbar';
import { MobileNavbar } from './mobile-navbar';

export function Header() {
  return (
    <header className="border-border/40 bg-primary/95 sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold">
            Wellness Log
          </Link>
        </div>

        <DesktopNavbar />
        <MobileNavbar />
      </div>
    </header>
  );
}
