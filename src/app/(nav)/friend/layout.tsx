import type { Metadata } from "next"
import type React from "react"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "友链🔗 | TaroBlog"
  }
}

export default function FriendLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
