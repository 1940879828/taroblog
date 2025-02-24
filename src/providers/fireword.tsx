"use client"
import ClickEffect from "@/hooks/FireworkEffect"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai"
import React from "react"

const FireWordEffect = () => {
  const isHappyMode = useAtomValue(isHappyModeAtom)

  return <>{isHappyMode && <ClickEffect />}</>
}

export default FireWordEffect
