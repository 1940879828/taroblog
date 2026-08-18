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
      // 主题持久化已改为「单一 cookie 源」，由根 layout 服务端读 cookie + 本组件 MutationObserver 回写 cookie。
      // 为避免 next-themes 默认往 localStorage 写 "theme" 与迁移脚本产生歧义，
      // 这里改用独立的 storageKey，让它不再触碰 "theme" 这个 key。
      storageKey="theme-pref"
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
