import type { Metadata } from "next"
import type React from "react"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Test🧪"
  }
}

export default function HistoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
