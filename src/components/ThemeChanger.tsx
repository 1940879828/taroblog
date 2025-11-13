"use client"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { type ChangeEvent, useEffect, useRef, useState } from "react"

const ThemeController = ({
  className,
  showText = false,
  size = 32
}: {
  className?: string
  showText?: boolean
  size?: number
}) => {
  const { setTheme, theme } = useTheme()
  const [isChecked, setIsChecked] = useState(theme === "cupcake")
  const mousePositionRef = useRef<{ clientX: number; clientY: number }>({
    clientX: 0,
    clientY: 0
  })

  useEffect(() => {
    setIsChecked(theme === "cupcake")
  }, [theme])

  // 监听鼠标点击事件，获取鼠标位置
  const handleMouseDown = (e: MouseEvent) => {
    mousePositionRef.current = { clientX: e.clientX, clientY: e.clientY }
  }

  // 在组件挂载时添加鼠标点击事件监听器
  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown)
    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const toTheme = theme === "dark" ? "cupcake" : "dark"
    const isSwitchingToDark = toTheme === "dark"
    
    const transition = document.startViewTransition(async () => {
      // 如果切换到暗色模式，添加类名以控制 z-index
      if (isSwitchingToDark) {
        document.documentElement.classList.add("dark-transition")
      } else {
        document.documentElement.classList.remove("dark-transition")
      }
      setTheme(toTheme)
      setIsChecked(e.target.checked)
    })

    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
      const { clientX, clientY } = mousePositionRef.current

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY)
      )
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      
      // 自定义动画
      const animation = document.documentElement.animate(
        {
          // 切换到暗色主题时，从大圆到小圆（白色逐渐消失）
          // 切换到亮色主题时，从小圆到大圆（黑色逐渐消失）
          clipPath: isSwitchingToDark ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          easing: "ease-in-out",
          // 切换到暗色主题时，裁剪旧的白色视图
          // 切换到亮色主题时，裁剪新的黑色视图
          pseudoElement: isSwitchingToDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)"
        }
      )
      
      // 方案B：在动画完成前提前调整z-index，避免白色闪烁
      if (isSwitchingToDark) {
        // 方案B：在动画完成前提前调整z-index，避免白色闪烁
        let progressHandled = false
        let tempStyle: HTMLStyleElement | null = null
        
        const adjustZIndex = () => {
          if (progressHandled) return
          progressHandled = true
          
          console.log("[ThemeChanger] 提前调整z-index，让新视图显示在上层")
          
          // 提前调整z-index，让新视图显示在上层
          tempStyle = document.createElement("style")
          tempStyle.id = "theme-transition-override"
          tempStyle.textContent = `
            .dark-transition::view-transition-new(root) {
              z-index: 101 !important;
            }
            .dark-transition::view-transition-old(root) {
              z-index: 99 !important;
            }
          `
          document.head.appendChild(tempStyle)
          console.log("[ThemeChanger] 已添加临时样式调整z-index")
        }
        
        // 在动画450ms时（90%）提前调整z-index
        setTimeout(() => {
          if (!progressHandled) {
            adjustZIndex()
          }
        }, 450)
        
        // 监听动画完成
        animation.addEventListener("finish", () => {
          console.log("[ThemeChanger] 动画完成")
          if (!progressHandled) {
            adjustZIndex()
          }
          
          // 等待过渡完成后再移除类
          Promise.all([animation.finished, transition.finished]).then(() => {
            console.log("[ThemeChanger] 过渡完成，准备移除类")
            // 使用双重 requestAnimationFrame 确保浏览器完成渲染
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                console.log("[ThemeChanger] 移除dark-transition类")
                document.documentElement.classList.remove("dark-transition")
                
                // 清理临时样式
                if (tempStyle && tempStyle.parentNode) {
                  setTimeout(() => {
                    document.head.removeChild(tempStyle!)
                    console.log("[ThemeChanger] 已清理临时样式")
                  }, 200)
                }
              })
            })
          }).catch((err) => {
            console.error("[ThemeChanger] 过渡出错:", err)
            document.documentElement.classList.remove("dark-transition")
            if (tempStyle && tempStyle.parentNode) {
              document.head.removeChild(tempStyle)
            }
          })
        })
      }
    })
  }

  return (
    <label className={cn("swap swap-rotate", className)}>
      <input
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
}

export default ThemeController
