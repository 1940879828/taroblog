"use client"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai/index"
import Image from "next/image"
import type React from "react"
import { type PropsWithChildren } from "react"

const HappyPageHero: React.FC<PropsWithChildren> = (props) => {
  const isHappyMode = useAtomValue(isHappyModeAtom)
  const { children } = props
  const randomParam = Math.random()

  return (
    <>
      {isHappyMode && (
        <div className="relative w-full h-64 flex justify-center items-center overflow-hidden">
          <Image
            src={`https://t.alcy.cc/fj?r=${randomParam}`}
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
