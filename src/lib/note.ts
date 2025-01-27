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

        const safeCategories = () => {
          if (Array.isArray(data.categories)) {
            return data.categories
              .map((t) => t?.toString().trim())
              .filter((t) => t && t !== "undefined")
          }
          if (data.categories != null) {
            return [data.categories.toString().trim()]
          }
          return []
        }

        const note: Note = {
          fileName: file.replace(/\.md$/, ""),
          title: data.title?.toString() || "Untitled",
          tags: safeTags(),
          date: safeDate(), // 使用安全转换
          categories: safeCategories(),
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

interface CategoryNode {
  name: string
  children: CategoryNode[]
}

// 构建单个分类树
const buildCategoryTree = (categories: string[]): CategoryNode | null => {
  if (!categories.length) return null

  return categories.reduceRight<CategoryNode>(
    (childNode, currentName) => ({
      name: currentName,
      children: childNode ? [childNode] : []
    }),
    null as unknown as CategoryNode
  )
}

// 合并两个节点
const mergeTwoNodes = (
  node1: CategoryNode,
  node2: CategoryNode
): CategoryNode => {
  if (node1.name !== node2.name) {
    throw new Error("Cannot merge nodes with different names")
  }

  const mergedChildren = new Map<string, CategoryNode>()

  // 合并两个节点的所有子节点
  ;[...node1.children, ...node2.children].forEach((child) => {
    if (mergedChildren.has(child.name)) {
      const existing = mergedChildren.get(child.name)!
      mergedChildren.set(child.name, mergeTwoNodes(existing, child))
    } else {
      mergedChildren.set(child.name, { ...child })
    }
  })

  return {
    name: node1.name,
    children: Array.from(mergedChildren.values())
  }
}

// 合并多个分类树
const mergeCategoryTrees = (trees: CategoryNode[]): CategoryNode[] => {
  const nodeMap = new Map<string, CategoryNode>()

  trees.forEach((tree) => {
    if (nodeMap.has(tree.name)) {
      nodeMap.set(tree.name, mergeTwoNodes(nodeMap.get(tree.name)!, tree))
    } else {
      nodeMap.set(tree.name, { ...tree })
    }
  })

  return Array.from(nodeMap.values())
}

export const getAllCategoriesTree = async (): Promise<CategoryNode[]> => {
  try {
    const notes = await getNotes()

    // 过滤掉空分类，并构建初始分类树
    const categoryTrees = notes
      .filter((note) => note.categories?.length > 0)
      .map((note) => buildCategoryTree(note.categories))
      .filter((tree): tree is CategoryNode => tree !== null)

    return mergeCategoryTrees(categoryTrees)
  } catch (error) {
    console.error("Error building category tree:", error)
    throw error
  }
}
