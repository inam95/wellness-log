import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/auth/auth.slice';
import { useNavigate } from '@tanstack/react-router';

export function MobileNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="cursor-pointer md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-4">
        <SheetHeader>
          <SheetTitle className="text-center text-2xl font-bold">Wellness</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <Button
            variant="outline"
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={() => {
              dispatch(logout());
              navigate({ to: '/login' });
            }}
          >
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
