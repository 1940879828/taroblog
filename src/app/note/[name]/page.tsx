import fs from "node:fs"
import path from "node:path"
import Markdown from "@/component/Markdown"
import matter from "gray-matter"
import { marked } from "marked"
import "md-editor-rt/lib/preview.css"

// 生成静态路径
export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), "public/notes")
  const fileNames = fs.readdirSync(notesDir)

  return fileNames.map((fileName) => ({
    name: fileName.replace(/\.md$/, "") // 去掉 .md 后缀
  }))
}

// 获取 Markdown 文件内容
async function getMarkdownContent(name: string) {
  const filePath = path.join(process.cwd(), "public/notes", `${name}.md`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { content } = matter(fileContent) // 解析 Markdown 内容
  return marked(content)
}

export default async function Note({ params }: { params: { name: string } }) {
  const { name } = params
  const content = await getMarkdownContent(name)

  return (
    <div className="p-20">
      <h1>{name}</h1>
      <Markdown content={content} />
    </div>
  )
}
