import { Link } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

export function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="cursor-pointer md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-4">
        <SheetHeader>
          <SheetTitle className="text-center text-2xl font-bold">Wellness Log</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <nav>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
          <SheetFooter>
            <Button variant="outline" className="w-full">
              Logout
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
