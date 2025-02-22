"use client"
import { MdCatalog, MdPreview } from "md-editor-rt"
import { useTheme } from "next-themes"
import "md-editor-rt/lib/preview.css"

type Props = {
  content: string
}

const Markdown = ({ content }: Props) => {
  const { theme } = useTheme()

  return (
    <>
      <div className="flex-1 flex justify-center relative">
        <MdPreview
          id="preview-only"
          value={content}
          theme={theme === "dark" ? "dark" : "light"}
        />
        {/* 目录 */}
        <div className="hidden lg:block mt-8 h-[calc(100vh-140px)] z-10 sticky top-4">
          <div className="text-xl mb-4">目录:</div>
          <MdCatalog
            editorId="preview-only"
            scrollElement={"#hi_scroll"}
            className="overflow-y-auto p-4 rounded-lg shadow-lg max-w-64"
          />
        </div>
      </div>
    </>
  )
}

export default Markdown
