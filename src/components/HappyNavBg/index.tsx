"use client"
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
      {isHappyMode && <div className={styles.animeBg} style={{ zIndex }} />}
    </>
  )
}

export default HappyNavBg
