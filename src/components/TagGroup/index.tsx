"use client"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"

const TagGroup = () => {
  const [allTags, setAllTags] = useState<string[]>([])
  const { theme } = useTheme()

  useEffect(() => {
    ;(async () => {
      const fetchTags = async () => {
        try {
          const response = await fetch("/api/tags")
          const data = await response.json()
          setAllTags(data.tags)
        } catch (error) {
          console.error("Failed to fetch tags:", error)
        }
      }

      await fetchTags()
    })()
  }, [])

  return (
    <div className="flex flex-wrap">
      {allTags.map((tag, index) => {
        const rainbowColors = [
          "#FF0000", // 红
          "#FF7F00", // 橙
          "#FFFF00", // 黄
          "#00FF00", // 绿
          "#0000FF", // 蓝
          "#4B0082", // 靛
          "#8F00FF" // 紫
        ]

        // HEX转RGB计算亮度
        const hexToLuma = (hex: string) => {
          const _hex = hex.replace(/^#/, "")
          const rgb = Number.parseInt(_hex, 16)
          const r = (rgb >> 16) & 0xff
          const g = (rgb >> 8) & 0xff
          const b = (rgb >> 0) & 0xff
          return 0.2126 * r + 0.7152 * g + 0.0722 * b // 亮度计算公式
        }

        const color = rainbowColors[index % rainbowColors.length]
        const textColor = hexToLuma(color) > 128 ? "black" : "white" // 亮度阈值128

        return (
          <Link
            href={`/tags/${tag}`}
            key={index}
            className={cn(
              "badge border-none mr-2 mt-2 text-xs pr-2 pl-1 h-6 cursor-pointer hover:scale-[110%] transition-transform duration-300",
              {
                "brightness-75 opacity-80 backdrop-blur-sm": theme === "dark"
              }
            )}
            style={{
              backgroundColor: color,
              color: textColor,
              textShadow:
                textColor === "white" ? "0 1px 2px rgba(0,0,0,0.5)" : "none" // 增强对比度
            }}
          >
            🏷{tag}
          </Link>
        )
      })}
    </div>
  )
}

export default TagGroup
