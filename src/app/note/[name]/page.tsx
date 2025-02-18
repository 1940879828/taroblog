import fs from "node:fs"
import path from "node:path"
import BackButton from "@/components/BackButton"
import Markdown from "@/components/Markdown"
import matter from "gray-matter"

// 生成静态路径
export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), "public/notes")
  const fileNames = fs.readdirSync(notesDir)
  return fileNames.map((fileName) => {
    // 解码文件名
    return {
      name: fileName.replace(/\.md$/, "")
    }
  })
}

// 获取 Markdown 文件内容
async function getMarkdownContent(name: string) {
  const decodedName = decodeURIComponent(name) // 将路径参数编码回来
  const filePath = path.join(process.cwd(), "public/notes", `${decodedName}.md`)
  const fileContent = fs.readFileSync(filePath, "utf8")
  const { content, data } = matter(fileContent) // 解析 Markdown 内容
  return { content, data }
}

export default async function NoteDetail({
  params
}: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const { content, data } = await getMarkdownContent(name)

  return (
    <div className="w-container flex-nowrap flex flex-col">
      <BackButton className="mt-4" />
      <div className="mt-2">: {data.title}</div>
      <Markdown content={content} />
    </div>
  )
}
