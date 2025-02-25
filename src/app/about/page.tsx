"use client"
import { useEffect } from 'react'
import { useSpring, a } from '@react-spring/web'
import Button from "@/components/Button"

export default function About() {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 0,
      transform: 'translateY(-80px)'  // 初始位置更高且带倾斜
    },
    config: {
      mass: 1.8,      // 增加质量感
      tension: 100,   // 提高弹性刚度
      friction: 180,   // 减少摩擦力
      velocity: 0.2   // 添加初始速度
    }
  }))

  useEffect(() => {
    api.start({
      to: [
        {
          opacity: 1,
          transform: 'translateY(25px) rotateZ(2deg)', // 过冲阶段
          config: { tension: 300, friction: 10 }
        },
        {
          transform: 'translateY(0) rotateZ(0deg)',    // 回弹阶段
          config: { tension: 180, friction: 20 }
        }
      ]
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