/** @type {import('next-sitemap').IConfig} */
const fs = require('fs')
const path = require('path')

// 直接在配置文件中实现获取笔记列表的功能
function getAllNotes() {
  const notesDir = path.join(process.cwd(), "public/notes")
  const fileNames = fs.readdirSync(notesDir)
  
  return fileNames.map(fileName => {
    const fullPath = path.join(notesDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // 提取文件名（不含扩展名）
    const name = fileName.replace(/\.md$/, '')
    
    // 从文件内容中提取日期（假设 markdown 文件头部有日期信息）
    const dateMatch = fileContents.match(/date:\s*(\d{4}-\d{2}-\d{2})/)
    const date = dateMatch ? dateMatch[1] : new Date().toISOString()
    
    return {
      fileName: name,
      date: date
    }
  })
}

module.exports = {
  siteUrl: "https://taroblog.top",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  priority: 0.7,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1 : 0.7,
      lastmod: new Date().toISOString()
    }
  },
  additionalPaths: async (config) => {
    const notes = getAllNotes()
    return notes.map((note) => ({
      loc: `/note/${note.fileName}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(note.date).toISOString()
    }))
  }
}
