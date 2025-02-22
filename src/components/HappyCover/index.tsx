"use client"

import { TypingAnimation } from "@/components/TypingAnimation"
import { MorphingText } from "@/components/useMorphingText"
import { cn, isMobile } from "@/lib/utils"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai"
import { useEffect, useRef } from "react"
import styles from "./index.module.css"

const HappyCover = () => {
  const isHappyMode = useAtomValue(isHappyModeAtom)
  const videoRef = useRef<HTMLVideoElement>(null) // 预加载的video引用

  // 预加载逻辑
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current = document.createElement("video")
      videoRef.current.src = "https://t.alcy.cc/acg"
      videoRef.current.preload = "auto" // 强制预加载
      videoRef.current.style.display = "none" // 隐藏预加载元素
      videoRef.current.load() // 手动触发加载
      videoRef.current.onerror = function() {
        window.alert("视频加载失败，请尝试关闭vpn或vpn放行：https://t.alcy.cc/")
      };
    }
  }, [])

  return (
    <>
      {!isMobile() && (
        <div className={cn("relative w-full h-full", { hidden: !isHappyMode })}>
          <video
            ref={videoRef}
            className={styles.edgeProtection}
            src={"https://t.alcy.cc/acg"}
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none"
            }}
            disablePictureInPicture // 禁用画中画
            disableRemotePlayback // 禁止投屏
            controlsList="nodownload noremoteplayback nofullscreen"
            onContextMenu={(e) => e.preventDefault()} // 禁用右键菜单
          />
          <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
            <MorphingText
              className="text-white"
              texts={["TaroBlog", "知识积累与沉淀"]}
            />
            <TypingAnimation
              delay={300}
              startOnView
              className="text-white text-xl"
            >
              其生若浮，其死若休。
            </TypingAnimation>
          </div>
        </div>
      )}
    </>
  )
}

export default HappyCover
