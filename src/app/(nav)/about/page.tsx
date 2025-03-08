"use client"
import { a, useSpring } from "@react-spring/web"
import { useEffect } from "react"

export default function About() {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      transform: "translateY(-100%)" // 初始位置在顶部外面
    },
    config: {
      mass: 1,
      tension: 120,
      friction: 20,
      clamp: true // 禁止过冲
    }
  }))

  useEffect(() => {
    api.start({
      to: {
        opacity: 1,
        transform: "translateY(0)"
      }
    })
  }, [api])

  return (
    <div className="min-h-screen flex items-center justify-center overflow-visible">
      <a.div style={springs}>
        <div>123</div>
      </a.div>
    </div>
  )
}
