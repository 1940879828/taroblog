"use client"
import { a, useSpring } from "@react-spring/web"
import type React from "react"
import { useEffect } from "react"

interface FadeInBottomProps {
  children: React.ReactNode
  index: number // 新增 index 属性
}

const FadeInBottom = ({ children, index }: FadeInBottomProps) => {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      transform: "translateY(100%)" // 初始位置在底部
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
      },
      delay: index * 80
    })
  }, [api])

  return <a.div style={springs}>{children}</a.div>
}

export default FadeInBottom
