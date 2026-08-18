"use client"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai"
import Image from "next/image"
import { useEffect, useState } from "react"
import type React from "react"
import type { PropsWithChildren } from "react"

const imgUrls = [
  "https://s21.ax1x.com/2025/03/01/pE8DdMV.webp",
  "https://s21.ax1x.com/2025/03/01/pE8DDZF.webp",
  "https://s21.ax1x.com/2025/03/01/pE8DUx0.webp"
]

const HappyPageHero: React.FC<PropsWithChildren> = (props) => {
  const isHappyMode = useAtomValue(isHappyModeAtom)
  const { children } = props
  const [mounted, setMounted] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    // 封面为随机装饰，依赖客户端环境，须等客户端挂载后再生成，避免 hydration mismatch
    setImgIndex((Math.random() * imgUrls.length) | 0)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {isHappyMode && (
        <div className="relative w-full h-64 flex justify-center items-center overflow-hidden">
          <Image
            src={imgUrls[imgIndex]}
            width={2501}
            height={1349}
            alt={"cover"}
            style={{
              zIndex: -1,
              position: "absolute",
              width: "100%",
              height: "auto"
            }}
          />
          {children && children}
        </div>
      )}
    </>
  )
}

export default HappyPageHero
