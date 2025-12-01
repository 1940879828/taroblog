import type { Metadata } from "next"
import type React from "react"

export async function generateMetadata(): Promise<Metadata> {
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
