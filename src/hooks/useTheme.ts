import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const listeners = new Set<() => void>()

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('theme', theme)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme)

  const toggleTheme = useCallback(() => {
    applyTheme(readTheme() === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggleTheme }
}
