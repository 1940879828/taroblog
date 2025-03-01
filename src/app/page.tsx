"use client"
import { AnimatedGridPattern } from "@/components/AnimatedGridPattern"
import HappyCover from "@/components/HappyCover"
import RoadMap from "@/components/RoadMap"
import { cn, isMobile } from "@/lib/utils"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtom } from "jotai"
import { useTheme } from "next-themes"
import Head from "next/head"
import React from "react"

export default function Home() {
  const { theme } = useTheme()
  const [_isHappyModeGlobal, _setIsHappyModeGlobal] = useAtom(isHappyModeAtom)

  // 网站信息
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TaroBlog",
    url: "https://taroblog.top",
    description: "这是我的个人博客，分享技术文章和心得体会。"
  }

  // 面包屑导航
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "🧭路线图",
        item: "https://taroblog.top/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "📒笔记",
        item: "https://taroblog.top/notes/1"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "🔗友链",
        item: "https://taroblog.top/friend"
      }
    ]
  }

  // Logo 和品牌信息
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "taroblog",
    url: "https://taroblog.top",
    logo: "https://taroblog.top/icon.png",
    sameAs: [
      "https://blog.csdn.net/csdn1940879828",
      "https://github.com/1940879828/taroblog",
      "https://gitee.com/code-jay"
    ]
  }

  return (
    <>
      <HappyCover />
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
        <RoadMap />
      </div>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
      </Head>
    </>
  )
}
