"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"
import { type PropsWithChildren, useEffect } from "react"

type Props = {
  initialTheme: string
}

const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  initialTheme
}) => {
  useEffect(() => {
    const handleThemeChange = (theme: string) => {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`
    }

    const initialDomTheme = document.documentElement.getAttribute("data-theme")
    if (initialDomTheme) {
      handleThemeChange(initialDomTheme)
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

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={initialTheme}
      themes={["cupcake", "dark"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
