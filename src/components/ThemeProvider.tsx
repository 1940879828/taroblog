"use client"

import { DEFAULT_THEME, type Theme, isTheme } from "@/lib/theme"
import type * as React from "react"
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react"

type Props = {
  initialTheme?: Theme
}

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (theme: Theme) => void
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const THEME_CHANNEL = "taroblog-theme"

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readDomTheme(fallback: Theme) {
  if (typeof document === "undefined") return fallback

  const domTheme = document.documentElement.getAttribute("data-theme")
  return isTheme(domTheme) ? domTheme : fallback
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme)
}

function persistTheme(theme: Theme) {
  document.cookie = `theme=${theme}; path=/; max-age=${COOKIE_MAX_AGE}`
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  initialTheme = DEFAULT_THEME
}) => {
  const channelRef = useRef<BroadcastChannel | null>(null)
  const [theme, setThemeState] = useState<Theme>(() =>
    readDomTheme(initialTheme)
  )

  const setTheme = useCallback((nextTheme: Theme) => {
    applyTheme(nextTheme)
    persistTheme(nextTheme)
    setThemeState(nextTheme)
    channelRef.current?.postMessage(nextTheme)
  }, [])

  useEffect(() => {
    const domTheme = readDomTheme(initialTheme)
    applyTheme(domTheme)
    persistTheme(domTheme)
    setThemeState(domTheme)
  }, [initialTheme])

  useEffect(() => {
    if (!("BroadcastChannel" in window)) return

    const channel = new BroadcastChannel(THEME_CHANNEL)
    channelRef.current = channel

    channel.onmessage = (event) => {
      if (!isTheme(event.data)) return

      applyTheme(event.data)
      persistTheme(event.data)
      setThemeState(event.data)
    }

    return () => {
      channelRef.current = null
      channel.close()
    }
  }, [])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme: theme,
      setTheme
    }),
    [setTheme, theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}

export default ThemeProvider
