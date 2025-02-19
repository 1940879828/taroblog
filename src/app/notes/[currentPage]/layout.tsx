import type React from "react"

export async function generateMetadata({
  params
}: {
  params: Promise<{
    currentPage: string
  }>
}) {
  const { currentPage } = await params
  return {
    title: `笔记列表 第${currentPage}页 | TaroBlog`
  }
}

export default function NoteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
