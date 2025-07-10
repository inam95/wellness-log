import { Button } from '@/components/ui/button';
import { setTheme } from '@/store/auth/user.slice';
import type { RootState } from '@/store/store';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.user);

  console.log(theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-foreground relative"
      aria-label="Toggle theme"
    >
      <Sun className={`h-4 w-4 transition-all ${theme === 'dark' ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon
        className={`absolute h-4 w-4 transition-all ${theme === 'dark' ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
      />
    </Button>
  );
};
