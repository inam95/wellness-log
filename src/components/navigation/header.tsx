import { getInitials } from '@/lib/utils';
import { logout } from '@/store/auth/auth.slice';
import type { RootState } from '@/store/store';
import { LogOut, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeToggle } from '../theme-toggle';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MobileNavbar } from './mobile-navbar';
import { useNavigate } from '@tanstack/react-router';

export function Header() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="bg-card border-border shadow-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary shadow-soft flex h-10 w-10 items-center justify-center rounded-xl">
              <span className="text-primary-foreground text-lg font-bold">W</span>
            </div>
            <div>
              <h1 className="text-foreground text-xl font-bold">Wellness</h1>
              <p className="text-muted-foreground text-xs">Your journey companion</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:flex">
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
                      {isAuthenticated ? getInitials(user?.name || '') : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm leading-none font-medium">{user?.name || 'User'}</p>
                  <p className="text-muted-foreground text-xs leading-none">{user?.email || 'user@example.com'}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => {
                    dispatch(logout());
                    navigate({ to: '/login' });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  );
}
