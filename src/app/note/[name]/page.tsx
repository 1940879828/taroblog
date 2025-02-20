import fs from "node:fs"
import path from "node:path"
import BackButton from "@/components/BackButton"
import Markdown from "@/components/Markdown"
import { getNoteDetail } from "@/lib/note"
import Head from "next/head"
import type React from "react"

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

export default async function NoteDetail({
  params
}: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const note = await getNoteDetail(name)
  // 动态生成 JSON-LD 数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.description,
    author: {
      "@type": "Person",
      name: "Taro"
    },
    datePublished: note.date,
    publisher: {
      "@type": "Organization",
      name: "Taro",
      logo: {
        "@type": "ImageObject",
        url: "https://www.taroblog.top/icon.png"
      }
    }
  }
  return (
    <div className="w-container flex-nowrap flex flex-col">
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <BackButton className="mt-4" />
      <div className="mt-2">: {note.title}</div>
      <Markdown content={note.content} />
    </div>
  )
}
