import "md-editor-rt/lib/preview.css"
import { ClientRenderer } from "@/components/Markdown/ClientRenderer"
import { cookies } from "next/headers"

type Props = {
  content: string
}

const Markdown = async ({ content }: Props) => {
  const cookieStore = await cookies()
  const initialTheme = cookieStore.get("theme")?.value || "cupcake"

  return <ClientRenderer content={content} initialTheme={initialTheme} />
}

export default Markdown
