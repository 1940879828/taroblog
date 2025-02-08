import type React from "react"

export async function generateMetadata({
  params
}: {
  params: Promise<{
    category: string
  }>
}) {
  const { category } = await params
  const _category = decodeURIComponent(category)
  return {
    title: `分类 ${_category} | TaroBlog`
  }
}

export default function CategoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
