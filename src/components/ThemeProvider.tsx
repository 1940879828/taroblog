"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"
import { type PropsWithChildren, useEffect, useState } from "react"

type Props = {
  initialTheme: string
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  initialTheme
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleThemeChange = (theme: string) => {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`
    }

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      if (currentTheme) {
        handleThemeChange(currentTheme)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    })

    return () => observer.disconnect()
  }, [initialTheme])

  if (!mounted) {
    return null
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={initialTheme}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
