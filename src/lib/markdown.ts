import GithubSlugger from "github-slugger"

export interface TocItem {
  id: string
  level: number
  text: string
}

const stripInlineMarkdown = (text: string) =>
  text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim()

export const extractToc = (content: string): TocItem[] => {
  const slugger = new GithubSlugger()

  return content
    .split(/\r?\n/)
    .map((line) => {
      const match = /^(#{1,6})\s+(.*)$/.exec(line.trim())
      if (!match) return null

      const [, hashes, rawText] = match
      const text = stripInlineMarkdown(rawText.replace(/\s+#*$/, ""))
      if (!text) return null

      return {
        id: slugger.slug(text),
        level: hashes.length,
        text
      }
    })
    .filter((item): item is TocItem => item !== null)
}
