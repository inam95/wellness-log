import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for stored theme preference or default to light
    const stored = localStorage.getItem('wellness_theme');
    const prefersDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setIsDark(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('wellness_theme', newTheme ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative" aria-label="Toggle theme">
      <Sun className={`h-4 w-4 transition-all ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`} />
    </Button>
  );
};
