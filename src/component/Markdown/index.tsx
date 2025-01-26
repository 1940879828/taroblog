"use client"
import { MdCatalog, MdPreview } from "md-editor-rt"
import { useState } from "react"
import {useTheme} from "next-themes";

type Props = {
  content: string
}

const Markdown = ({ content }: Props) => {
  const {theme} = useTheme()
  const [id] = useState("preview-only")
  const [scrollElement] = useState(document.documentElement)

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
