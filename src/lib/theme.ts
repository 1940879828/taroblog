import { useEffect, useState } from "react"

const THEME_KEY = "theme"

export function setTheme(theme: "dark" | "cupcake") {
  const html = document.querySelector("html")
  if (!html) return
  html.setAttribute("data-theme", theme)
  localStorage.setItem(THEME_KEY, theme)
}

export function initTheme() {
  const html = document.querySelector("html")
  if (!html) return
  html.setAttribute(
    "data-theme",
    localStorage.getItem(THEME_KEY) || getBrowserTheme()
  )
}

function getBrowserTheme() {
  const isDarkMode = window.matchMedia?.("(prefers-color-scheme: dark)").matches
  return isDarkMode ? "dark" : "cupcake"
}

// 自定义 Hook：useGetTheme
export function useGetTheme() {
  const [theme, setTheme] = useState<"dark" | "cupcake">(() => {
    // 从 localStorage 或浏览器默认主题中获取初始值
    return (
      (localStorage.getItem(THEME_KEY) as "dark" | "cupcake") ||
      getBrowserTheme()
    )
  })

  useEffect(() => {
    // 监听 localStorage 的变化
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === THEME_KEY) {
        setTheme(event.newValue as "dark" | "cupcake")
      }
    }

    // 监听 data-theme 属性的变化
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const newTheme = document.documentElement.getAttribute(
            "data-theme"
          ) as "dark" | "cupcake"
          setTheme(newTheme)
        }
      }
    })

    // 开始监听
    window.addEventListener("storage", handleStorageChange)
    observer.observe(document.documentElement, {
      attributes: true // 监听属性变化
    })

    // 清理监听
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      observer.disconnect()
    }
  }, [])

  return theme
}
