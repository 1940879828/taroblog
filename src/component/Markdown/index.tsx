"use client"
import { useGetTheme } from "@/lib/theme"
import { MdCatalog, MdPreview } from "md-editor-rt"
import { useState } from "react"

type Props = {
  content: string
}

const Markdown = ({ content }: Props) => {
  const [id] = useState("preview-only")
  const [scrollElement] = useState(document.documentElement)
  const theme = useGetTheme()

  return (
    <>
      <MdPreview
        id={id}
        value={content}
        theme={theme === "dark" ? "dark" : "light"}
      />
      <MdCatalog editorId={id} scrollElement={scrollElement} />
    </>
  )
}

export default Markdown
