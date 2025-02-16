"use server"

import { getNotes } from "@/lib/note"

export async function searchFile(keyword: string) {
  const notes = await getNotes()
  return notes
    .filter((note) => {
      return note.title.includes(keyword) || note.content.includes(keyword)
    })
    .map((note) => {
      let snippet = ""
      const content = note.content
      const keywordIndex = content.indexOf(keyword)

      // 处理 content 包含关键词的情况
      if (keywordIndex !== -1) {
        // 计算截取范围（关键词前后各 50 字符）
        const start = Math.max(0, keywordIndex - 50)
        const end = Math.min(content.length, keywordIndex + keyword.length + 50)

        // 截取内容片段
        let extracted = content.substring(start, end)

        // 添加省略号指示截断
        if (start > 0) extracted = `...${extracted}`
        if (end < content.length) extracted += "..."

        snippet = extracted
      }

      return {
        ...note,
        snippet: snippet
      }
    })
}
