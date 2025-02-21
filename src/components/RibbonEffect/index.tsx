"use client"
import { init } from "@/lib/ribbon"
import { useEffect, useId } from "react"

export default function RibbonEffect() {
  const ribbonContainer = useId()

  useEffect(() => {
    ;(async () => {
      try {
        init(ribbonContainer)
      } catch (error) {
        console.error("Failed to load ribbon:", error)
      }
    })()

    return () => {
      const root = document.getElementById(ribbonContainer)
      if (root) root.innerHTML = ""
      document.onclick = null
      document.ontouchstart = null
    }
  }, [ribbonContainer])

  return <div id={ribbonContainer} />
}
