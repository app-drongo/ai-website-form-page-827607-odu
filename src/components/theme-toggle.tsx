'use client'

import { useTheme } from '@/hooks/use-theme'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Theme Toggle Component - High Contrast Inverted Colors
 * 
 * Light mode → Dark button (high visibility)
 * Dark mode → Light button (high visibility)
 */
export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        disabled
        aria-label="Toggle theme"
        className="bg-background border-border"
      >
        <span className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={
        theme === 'light'
          ? // Light mode → DARK button with white icon
            '!bg-gray-900 !text-white !border-gray-800 hover:!bg-gray-800 shadow-lg'
          : // Dark mode → LIGHT button with dark icon
            '!bg-white !text-gray-900 !border-gray-300 hover:!bg-gray-50 shadow-lg'
      }
    >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}