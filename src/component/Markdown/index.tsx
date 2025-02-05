"use client"
import { MdCatalog, MdPreview } from "md-editor-rt"
import { useTheme } from "next-themes"
import { useRef, useState } from "react"
import "md-editor-rt/lib/preview.css"

type Props = {
  content: string
}

const Markdown = ({ content }: Props) => {
  const { theme } = useTheme()
  const [id] = useState("preview-only")
  const [scrollElement] = useState(document.documentElement)
  return (
    <div className="flex-1 flex justify-center relative">
      <MdPreview
        id={id}
        value={content}
        theme={theme === "dark" ? "dark" : "light"}
      />
      {/* 目录 */}
      <div className="hidden lg:block mt-8 h-[calc(100vh-140px)] z-10 sticky top-4">
        <div className="text-xl mb-4">目录:</div>
        <MdCatalog
          editorId={id}
          scrollElement={scrollElement}
          className="overflow-y-auto h-full p-4 rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export default Markdown
