"use client"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai/index"
import Image from "next/image"
import type React from "react"
import type { PropsWithChildren } from "react"

const HappyPageHero: React.FC<PropsWithChildren> = (props) => {
  const isHappyMode = useAtomValue(isHappyModeAtom)
  const { children } = props

  const imgUrl = [
    "https://s21.ax1x.com/2025/03/01/pE8DdMV.webp",
    "https://s21.ax1x.com/2025/03/01/pE8DDZF.webp",
    "https://s21.ax1x.com/2025/03/01/pE8DUx0.webp"
  ]

  return (
    <>
      {isHappyMode && (
        <div className="relative w-full h-64 flex justify-center items-center overflow-hidden">
          <Image
            src={imgUrl[(Math.random() * imgUrl.length) | 0]}
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
