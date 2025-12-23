'use client'

import { useEffect, useState } from 'react'

/**
 * Theme hook - Provides theme switching functionality
 * 
 * Usage:
 *   const { theme, setTheme, toggleTheme, mounted } = useTheme()
 * 
 * Returns:
 *   - theme: Current theme ('light' | 'dark')
 *   - setTheme: Function to set specific theme
 *   - toggleTheme: Function to toggle between themes
 *   - mounted: Boolean to prevent hydration mismatch
 */
export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Load saved theme after component mounts
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || 'light'
    setThemeState(initialTheme)
  }, [])

  // Function to set a specific theme
  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Function to toggle between themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return {
    theme,      // Current theme: 'light' | 'dark'
    setTheme,   // Set specific theme: setTheme('dark')
    toggleTheme, // Toggle: light ↔ dark
    mounted     // Safe to render? (prevents hydration issues)
  }
}