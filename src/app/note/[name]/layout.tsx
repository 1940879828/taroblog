import { getNoteDetail } from "@/lib/note"
import Head from "next/head"
import type React from "react"

export async function generateMetadata({
  params
}: {
  params: Promise<{
    name: string
  }>
}) {
  const { name } = await params
  const note = await getNoteDetail(name)
  return {
    title: `${decodeURI(note.title)} | TaroBlog`,
    description: note.description,
    alternates: {
      canonical: `https://taroblog.top/note/${note.fileName}` // 动态生成 canonical URL
    },
    openGraph: {
      title: note.title,
      description: note.description,
      url: `https://taroblog.top/note/${note.title}`, // 页面的完整 URL
      siteName: "TaroBlog",
      images: [
        {
          url: "https://t.alcy.cc/ycy", // Open Graph 图片 URL
          width: 800,
          height: 600,
          alt: "beautiful cover"
        }
      ],
      locale: "zh_CN", // 页面的语言和地区
      type: "article" // 页面类型，如 'website', 'article' 等
    }
  }
}

export default function NoteDetailLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
