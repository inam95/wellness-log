import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const MOOD_CONFIG = {
  happy: { emoji: '😊', label: 'Happy', color: 'text-mood-happy' },
  stressed: { emoji: '😰', label: 'Stressed', color: 'text-mood-stressed' },
  tired: { emoji: '😴', label: 'Tired', color: 'text-mood-tired' },
  focused: { emoji: '🎯', label: 'Focused', color: 'text-mood-focused' },
} as const;
