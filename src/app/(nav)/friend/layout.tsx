import type React from "react"

export async function generateMetadata() {
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
