import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"

interface Note {
  fileName: string
  title: string
  tags: string[]
  date: string
  categories: string[]
  content: string
}

export const getNotes = async () => {
  const notesDir = path.join(process.cwd(), "public/notes")
  const files = await fs.readdir(notesDir)
  return await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(notesDir, file)
        const fileContent = await fs.readFile(filePath, "utf8")
        const { data, content } = matter(fileContent)

        // 处理日期类型转换
        const safeDate = () => {
          if (!data.date) return ""
          if (data.date instanceof Date) {
            return data.date.toISOString().split("T")[0] // 转换为 YYYY-MM-DD 格式
          }
          return data.date.toString()
        }

        const safeTags = () => {
          if (Array.isArray(data.tags)) {
            return data.tags
              .map((t) => t?.toString().trim())
              .filter((t) => t && t !== "undefined")
          }
          if (data.tags != null) {
            return [data.tags.toString().trim()]
          }
          return []
        }

        const note: Note = {
          fileName: file.replace(/\.md$/, ""),
          title: data.title?.toString() || "Untitled",
          tags: Array.isArray(data.tags) ? data.tags : [data.tags?.toString()],
          date: safeDate(), // 使用安全转换
          categories: safeTags(),
          content: content?.toString() || ""
        }
        return note
      })
  )
}

export const getAllTags = async (): Promise<string[]> => {
  const notes = await getNotes()
  const allTags = notes
    .flatMap((note) => note.tags)
    .filter((tag) => tag && tag.trim() !== "") // 过滤空字符串和 null/undefined
  return [...new Set(allTags)] // 去重
}
