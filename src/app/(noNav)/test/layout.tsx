import type React from "react"

export async function generateMetadata() {
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
