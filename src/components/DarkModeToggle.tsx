'use client';

import { Button } from '@/components/ui/Button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

interface DarkModeToggleProps {
  className?: string;
}

export function DarkModeToggle({ className }: DarkModeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="hidden dark:inline-block" />
      <Moon className="dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
