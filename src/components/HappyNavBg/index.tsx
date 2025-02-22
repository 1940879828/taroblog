"use client"
import { cn } from "@/lib/utils"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai/index"
import styles from "./index.module.css"
const HappyNavBg = ({
  zIndex = 0
}: {
  zIndex?: number
}) => {
  const isHappyMode = useAtomValue(isHappyModeAtom)
  return (
    <>
      {isHappyMode && <div className={cn(styles.animeBg, `z-[${zIndex}]`)} />}
    </>
  )
}

export default HappyNavBg
