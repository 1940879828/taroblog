import type React from "react"

export async function generateMetadata() {
  return {
    title: "历史🕙 | TaroBlog"
  }
}

export default function HistoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
