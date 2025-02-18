"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type * as React from "react"
import { type PropsWithChildren, useEffect, useState } from "react"

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
