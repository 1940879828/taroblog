import {promises as fs} from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import _ from 'lodash';

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
        const {data, content} = matter(fileContent)

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

const buildTree = (arr: string[]): any[] => {
  if (arr.length === 0) return []

  const result: any[] = []

  // 递归生成树状结构
  const createNode = (index: number): any => {
    if (index >= arr.length) return null

    const node = {
      name: arr[index],
      children: createNode(index + 1) ? [createNode(index + 1)] : [] // 如果有后续元素，继续递归
    }

    return node
  }

  // 开始递归从第一个元素开始
  result.push(createNode(0))

  return result
}

// 合并分类并递归处理
const mergeCategories = (data) => {
  // 将数据展平并去重
  const flattened = _.flatten(data);

  // 创建一个 Map 来存储合并后的分类
  const categoryMap = new Map();

  flattened.forEach(item => {
    if (categoryMap.has(item.name)) {
      // 如果已经存在该分类，则合并 children
      const existingItem = categoryMap.get(item.name);
      existingItem.children = mergeCategoriesHelper([...existingItem.children, ...item.children]);
    } else {
      // 否则加入 Map
      categoryMap.set(item.name, { ...item, children: mergeCategoriesHelper(item.children) });
    }
  });

  return Array.from(categoryMap.values());
};

// 合并每一层的子节点
const mergeCategoriesHelper = (children) => {
  if (!children || children.length === 0) {
    return [];
  }

  const childMap = new Map();

  children.forEach(child => {
    if (childMap.has(child.name)) {
      // 合并子节点的 children
      const existingChild = childMap.get(child.name);
      existingChild.children = mergeCategoriesHelper([...existingChild.children, ...child.children]);
    } else {
      // 直接存入
      childMap.set(child.name, { ...child, children: mergeCategoriesHelper(child.children) });
    }
  });

  return Array.from(childMap.values());
};


export const getAllCategoriesTree = async (): Promise<any> => {
  const notes = await getNotes()
  let result: any[][] = []
  notes.map(({categories}) => {
    if (categories && categories.length > 0) {
      const resultArray = buildTree(categories)
      result.push(resultArray)
    }
  })
  return mergeCategories(result)
}