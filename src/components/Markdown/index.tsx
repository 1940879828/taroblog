import { extractToc } from "@/lib/markdown"
import rehypeSlug from "rehype-slug"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  content: string
}

const Markdown = async ({ content }: Props) => {
  const toc = extractToc(content)

  return (
    <div className="flex-1 flex justify-center relative gap-8">
      <article className="markdown-content min-w-0 flex-1 pb-24">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSlug]}
          components={{
            a: ({ ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noreferrer"
              />
            ),
            img: ({ ...props }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img {...props} loading="lazy" alt={props.alt ?? ""} />
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {toc.length > 0 ? (
        <aside className="hidden lg:flex flex-col mt-8 h-[calc(100vh-140px)] z-10 sticky top-4 w-64 shrink-0">
          <div className="text-xl mb-4">目录:</div>
          <nav className="markdown-toc flex-1 min-h-0 overflow-y-auto p-4 rounded-lg shadow-lg">
            <ul className="space-y-2">
              {toc.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                >
                  <a href={`#${item.id}`} className="block transition-colors">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      ) : null}
    </div>
  )
}

export default Markdown
