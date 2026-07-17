'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  bakeryThemeStyle,
  THEMES,
  type ThemeMode,
} from '@/components/bakery/theme'

type ThemeContextValue = {
  theme: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'hearth-bakery-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored)
    }
  }, [])

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode)
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const vars = bakeryThemeStyle(theme)
    const t = THEMES[theme]
    const applied = Object.entries(vars).filter(
      ([, value]) => typeof value === 'string',
    ) as Array<[string, string]>

    for (const [key, value] of applied) {
      root.style.setProperty(key, value)
    }
    body.style.backgroundColor = t.bg
    root.style.colorScheme = theme
    root.setAttribute('data-bakery-theme', theme)

    return () => {
      for (const [key] of applied) {
        root.style.removeProperty(key)
      }
      root.removeAttribute('data-bakery-theme')
    }
  }, [theme])

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useBakeryTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useBakeryTheme must be used within ThemeProvider')
  }
  return ctx
}
