import "md-editor-rt/lib/preview.css"
import { ClientRenderer } from "@/components/Markdown/ClientRenderer"

type Props = {
  content: string
}

const Markdown = async ({ content }: Props) => {
  return <ClientRenderer content={content} />
}

export default Markdown
