import type React from "react"

export async function generateMetadata({
  params
}: {
  params: Promise<{
    tag: string
  }>
}) {
  const { tag } = await params
  const _tag = decodeURIComponent(tag)
  return {
    title: `标签 ${_tag} | TaroBlog`
  }
}

export default function TagLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
