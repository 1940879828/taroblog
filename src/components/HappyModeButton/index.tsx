"use client"
import { isHappyModeAtom } from "@/store/happyMode"
import type { Timeout } from "ahooks/lib/useRequest/src/types"
import { useSetAtom } from "jotai"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRef, useState } from "react"

const HappyModeButton = () => {
  const [isHappyMode, setIsHappyMode] = useState(false)
  const [animationPhase, setAnimationPhase] = useState("idle") // 'idle', 'up', 'down'
  const setIsHappyModeGlobal = useSetAtom(isHappyModeAtom)
  const { setTheme, theme } = useTheme()

  const upTimerRef = useRef<Timeout>(null)
  const downTimerRef = useRef<Timeout>(null)

  const change = () => {
    onInputChange()
  }

  const handleClick = () => {
    if (animationPhase === "down") return // 下降过程不可中断

    // 立即切换状态
    const newHappy = !isHappyMode
    setIsHappyMode(newHappy)

    if (newHappy) {
      // 处理上升动画
      if (animationPhase === "up" && upTimerRef.current)
        clearTimeout(upTimerRef.current)
      setAnimationPhase("up")
      upTimerRef.current = setTimeout(() => {
        change()
        setAnimationPhase("idle")
      }, 3000)
    } else {
      // 处理下降动画
      if (animationPhase === "up" && upTimerRef.current)
        clearTimeout(upTimerRef.current)
      setAnimationPhase("down")
      change() // 下降立即触发change
      downTimerRef.current = setTimeout(() => {
        setAnimationPhase("idle")
      }, 3000)
    }
  }

  const onInputChange = () => {
    const toTheme = theme === "dark" ? "cupcake" : "dark"
    const transition = document.startViewTransition(async () => {
      // 如果当前是暗色模式，添加类名以控制 z-index
      if (theme === "cupcake") {
        document.documentElement.classList.add("dark-transition")
      } else {
        document.documentElement.classList.remove("dark-transition")
      }
      setTheme(toTheme)
      setIsHappyModeGlobal((prev) => !prev)
    })

    // 在 transition.ready 的 Promise 完成后，执行自定义动画
    transition.ready.then(() => {
      const clientX = innerWidth - 238
      const clientY = innerHeight - 112

      // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
      const radius = Math.hypot(clientX, clientY)

      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ]
      // 自定义动画
      document.documentElement.animate(
        {
          // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
          clipPath: theme === "cupcake" ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
          pseudoElement:
            theme === "cupcake"
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)"
        }
      )
      // 确保在动画完成后移除类
      transition.ready.then(() => {
        if (theme === "dark") {
          document.documentElement.classList.remove("dark-transition")
        }
      })
    })
  }

  return (
    <div className="fixed bottom-0 right-16">
      <div
        style={{
          marginBottom: isHappyMode ? "-5px" : "-120px",
          transition: "all 3s ease-in-out"
        }}
        className={`w-48 h-auto ${
          animationPhase === "down" ? "pointer-events-none" : "cursor-pointer"
        }`}
        onClick={handleClick}
      >
        <Image
          src="https://s21.ax1x.com/2025/02/21/pEQ4nIS.png"
          alt="logo"
          width={192}
          height={138}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  )
}

export default HappyModeButton
