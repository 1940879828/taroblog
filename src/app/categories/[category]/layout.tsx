import type React from "react"

export async function generateMetadata({
 params
}: {
  params: Promise<{
    category: string
  }>
}) {
  let { category } = await params
  return {
    title: `分类 ${category} | TaroBlog`,
  }
}

export default function CategoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
