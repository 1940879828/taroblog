"use client"
import { useTheme } from "@/components/ThemeProvider"
import { cn } from "@/lib/utils"
import {
  type ChangeEvent,
  type PointerEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef
} from "react"
import { flushSync } from "react-dom"

export interface ThemeChangerRef {
  toggleTheme: () => void
  setTheme: (theme: "dark" | "cupcake") => void
  getCurrentTheme: () => string | undefined
}

function warmThemeTransition() {
  if (typeof document === "undefined") return
  if (!document.startViewTransition) return
  if (document.documentElement.classList.contains("theme-view-transition"))
    return

  const warmState = getThemeTransitionWarmState()

  if (
    warmState.__taroblogThemeTransitionWarmed ||
    warmState.__taroblogThemeTransitionWarming
  ) {
    return
  }

  warmState.__taroblogThemeTransitionWarming = true
  document.documentElement.classList.add("theme-view-transition")

  const transition = document.startViewTransition(() => {})
  transition.ready
    .then(() => {
      const animation = document.documentElement.animate(
        {
          clipPath: ["circle(0px at 50% 50%)", "circle(150vmax at 50% 50%)"]
        },
        {
          duration: 160,
          easing: "linear",
          fill: "both",
          pseudoElement: "::view-transition-new(root)"
        }
      )

      return animation.finished
    })
    .catch(() => undefined)
    .finally(() => {
      document.documentElement.classList.remove("theme-view-transition")
      warmState.__taroblogThemeTransitionWarming = false
      warmState.__taroblogThemeTransitionWarmed = true
    })
}

function getThemeTransitionWarmState() {
  return window as Window & {
    __taroblogThemeTransitionWarmed?: boolean
    __taroblogThemeTransitionWarming?: boolean
  }
}

const ThemeController = forwardRef<
  ThemeChangerRef,
  {
    className?: string
    showText?: boolean
    size?: number
  }
>(({ className, showText = false, size = 32 }, ref) => {
  const { resolvedTheme, setTheme } = useTheme()
  const labelRef = useRef<HTMLLabelElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const transitionOriginRef = useRef<{
    clientX: number
    clientY: number
  } | null>(null)
  const currentTheme = resolvedTheme
  const isChecked = currentTheme === "cupcake"

  useEffect(() => {
    const scheduleWarmup = () => {
      warmThemeTransition()
    }

    const requestIdleCallback = window.requestIdleCallback

    if (requestIdleCallback) {
      const idleId = requestIdleCallback(scheduleWarmup, {
        timeout: 1200
      })

      return () => {
        window.cancelIdleCallback(idleId)
      }
    }

    const timerId = setTimeout(scheduleWarmup, 600)
    return () => {
      clearTimeout(timerId)
    }
  }, [])

  const getControlCenter = useCallback(() => {
    const rect = labelRef.current?.getBoundingClientRect()

    if (!rect || rect.width === 0 || rect.height === 0) {
      return {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
      }
    }

    return {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2
    }
  }, [])

  const getTransitionOrigin = useCallback(() => {
    return transitionOriginRef.current ?? getControlCenter()
  }, [getControlCenter])

  // 处理主题切换的逻辑（提取为独立函数，方便外部调用）
  const handleThemeChange = useCallback(
    (toTheme: "dark" | "cupcake") => {
      if (typeof window === "undefined") return

      const applyTheme = () => {
        setTheme(toTheme)

        if (inputRef.current) {
          inputRef.current.checked = toTheme === "cupcake"
        }
      }

      if (!document.startViewTransition) {
        applyTheme()
        return
      }

      document.documentElement.classList.remove("dark-transition")
      document.documentElement.classList.add("theme-view-transition")

      const transition = document.startViewTransition(() => {
        flushSync(applyTheme)
      })

      // 在 transition.ready 的 Promise 完成后，执行自定义动画
      transition.ready.then(() => {
        const { clientX, clientY } = getTransitionOrigin()
        transitionOriginRef.current = null
        const viewportWidth = window.visualViewport?.width ?? window.innerWidth
        const viewportHeight =
          window.visualViewport?.height ?? window.innerHeight
        const originXPercent = (clientX / viewportWidth) * 100
        const originYPercent = (clientY / viewportHeight) * 100
        const circleAnchor = `${originXPercent}% ${originYPercent}%`

        // 计算半径，以控件中心为圆心，到四个角的距离中最大的那个作为半径
        const radius = Math.hypot(
          Math.max(clientX, viewportWidth - clientX),
          Math.max(clientY, viewportHeight - clientY)
        )
        const clipPath = [
          `circle(0px at ${circleAnchor})`,
          `circle(${radius}px at ${circleAnchor})`
        ]

        const animation = document.documentElement.animate(
          {
            clipPath
          },
          {
            duration: 500,
            easing: "linear",
            fill: "both",
            pseudoElement: "::view-transition-new(root)"
          }
        )

        animation.finished
          .catch(() => undefined)
          .finally(() => {
            document.documentElement.classList.remove("theme-view-transition")
          })
      })
    },
    [getTransitionOrigin, setTheme]
  )

  // 暴露方法供外部调用
  useImperativeHandle(
    ref,
    () => ({
      // 切换主题（通过触发 input 的 click 事件）
      toggleTheme: () => {
        transitionOriginRef.current = getControlCenter()
        if (inputRef.current) {
          inputRef.current.click()
        }
      },
      // 直接设置主题
      setTheme: (newTheme: "dark" | "cupcake") => {
        transitionOriginRef.current = getControlCenter()
        handleThemeChange(newTheme)
      },
      // 获取当前主题
      getCurrentTheme: () => {
        return currentTheme
      }
    }),
    [currentTheme, getControlCenter, handleThemeChange]
  )

  const handlePointerDown = useCallback(
    (_e: PointerEvent<HTMLLabelElement>) => {
      transitionOriginRef.current = getControlCenter()
    },
    [getControlCenter]
  )

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof window === "undefined") return

    // 根据 checkbox 的 checked 状态决定主题
    // checked = true 表示 cupcake，checked = false 表示 dark
    const toTheme = e.target.checked ? "cupcake" : "dark"
    handleThemeChange(toTheme)
  }

  return (
    <label
      ref={labelRef}
      className={cn("swap swap-rotate", className)}
      onPointerDown={handlePointerDown}
    >
      <input
        ref={inputRef}
        type="checkbox"
        checked={isChecked}
        className="theme-controller"
        onChange={onInputChange}
      />

      <svg
        className="swap-off fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={size}
        width={size}
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      <svg
        className="swap-on fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={size}
        width={size}
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
      {showText && "切换主题"}
    </label>
  )
})

ThemeController.displayName = "ThemeController"

export default ThemeController
