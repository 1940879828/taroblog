"use client"
import { AnimatedGridPattern } from "@/components/AnimatedGridPattern"
import { useTheme } from "@/components/ThemeProvider"
import { backendMap, map } from "@/config/roadMap"
import { cn, isMobile } from "@/lib/utils"
import { motion } from "motion/react"
import dynamic from "next/dynamic"
import React, { useState } from "react"

// Konva 画布依赖浏览器环境，关闭 SSR，客户端水合后再加载绘制
const RoadMap = dynamic(() => import("@/components/RoadMap"), {
  ssr: false
})

type Tab = "frontend" | "backend"

const Index = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState<Tab>("frontend")
  const currentMap = activeTab === "frontend" ? map : backendMap

  return (
    <div className="relative overflow-hidden h-full sm:overflow-auto sm:h-auto">
      <div className="absolute inset-0 z-[-2] bg-base-100" />
      {theme !== "dark" && !isMobile() && (
        <AnimatedGridPattern
          y={100}
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
            "skew-y-12 z-[-1] fixed left-0 top-[65px]"
          )}
        />
      )}
      <div className="flex justify-center pt-4 pb-2 relative z-10">
        <div role="tablist" className="tabs tabs-boxed">
          <motion.button
            type="button"
            role="tab"
            className={`tab${activeTab === "frontend" ? " tab-active" : ""}`}
            onClick={() => setActiveTab("frontend")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            前端
          </motion.button>
          <motion.button
            type="button"
            role="tab"
            className={`tab${activeTab === "backend" ? " tab-active" : ""}`}
            onClick={() => setActiveTab("backend")}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            后端
          </motion.button>
        </div>
      </div>
      <RoadMap map={currentMap} />
    </div>
  )
}

export default Index
