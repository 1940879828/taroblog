import NavBar from "@/components/NavBar"
import type React from "react"

export default function HistoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavBar />
      <div
        id="hi_scroll"
        className="relative overflow-auto h-[calc(100vh-65px)]"
      >
        {children}
      </div>
    </>
  )
}
