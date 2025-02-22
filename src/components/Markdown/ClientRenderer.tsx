// components/markdown/ClientRenderer.tsx （客户端）
"use client"

import { MdCatalog, MdPreview } from "md-editor-rt"
import { useTheme } from "next-themes"
import { useEffect } from "react"

export const ClientRenderer = ({
  content,
  initialTheme // 来自服务端的初始主题
}: {
  content: string
  initialTheme: string
}) => {
  const { theme, setTheme } = useTheme()
  // 同步初始主题
  useEffect(() => {
    if (theme !== initialTheme) {
      setTheme(initialTheme)
    }
  }, [initialTheme]) // 仅在 initialTheme 变化时执行
  return (
    <div className="flex-1 flex justify-center relative">
      <MdPreview
        id="preview-only"
        value={content}
        theme={theme === "dark" ? "dark" : "light"}
      />
      {/* 目录组件保持不变 */}
      <div className="hidden lg:block mt-8 h-[calc(100vh-140px)] z-10 sticky top-4">
        <div className="text-xl mb-4">目录:</div>
        <MdCatalog
          editorId="preview-only"
          scrollElement={"#hi_scroll"}
          className="overflow-y-auto p-4 rounded-lg shadow-lg max-w-64"
        />
      </div>
    </div>
  )
}
