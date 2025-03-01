"use client"

import { TypingAnimation } from "@/components/TypingAnimation"
import { MorphingText } from "@/components/useMorphingText"
import { cn, isMobile } from "@/lib/utils"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import React, { useRef } from "react"
import styles from "./index.module.css"

const HappyCover = () => {
  const isHappyMode = useAtomValue(isHappyModeAtom)
  const coverRef = useRef<HTMLDivElement | null>(null)

  function goToDown() {
    if (coverRef) {
      coverRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <>
      {!isMobile() && (
        <div className={cn("relative w-full h-full", { hidden: !isHappyMode })}>
          <Image
            src={"https://s21.ax1x.com/2025/03/01/pE8DbRI.jpg"}
            width={1920}
            height={1080}
            alt={"cover"}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "calc(100vh - 65px)"
            }}
          />
          <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
            <div className="w-full flex flex-col items-center justify-center gap-2 bg-black/50 py-12 -mt-20">
              <MorphingText
                className="text-white"
                texts={["TaroBlog", "知识积累与沉淀"]}
              />
              <TypingAnimation delay={300} className="text-white text-xl">
                其生若浮，其死若休。
              </TypingAnimation>
            </div>
            <div className={styles.angleDown} onClick={goToDown}>
              <ChevronDown size={32} />
            </div>
          </div>
          <div ref={coverRef} />
        </div>
      )}
    </>
  )
}

export default HappyCover
