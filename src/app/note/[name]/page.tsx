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
  return fileNames.map((fileName) => {
    // 解码文件名
    const decodedName = encodeURIComponent(fileName.replace(/\.md$/, ""))
    console.log({ decodedName })
    return {
      name: decodedName
    }
  })
}

// 获取 Markdown 文件内容
async function getMarkdownContent(name: string) {
  const decodedName = decodeURIComponent(name) // 将路径参数编码回来
  console.log({ decodedName })
  const filePath = path.join(process.cwd(), "public/notes", `${decodedName}.md`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { content } = matter(fileContent) // 解析 Markdown 内容
  return marked(content)
}

export default async function NoteDetail({
  params
}: { params: { name: string } }) {
  const { name } = params
  const content = await getMarkdownContent(name)

  return (
    <div className="flex justify-center">
      <div className="w-[1280px]">
        <Markdown content={content} />
      </div>
    </div>
  )
}
