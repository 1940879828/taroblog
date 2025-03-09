import NavBar from "@/components/NavBar"
import type React from "react"
import HappyModeButton from "@/components/HappyModeButton";

export default function HistoryLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <NavBar />
      <HappyModeButton />
      <div
        id="hi_scroll"
        className="relative overflow-auto h-[calc(100vh-65px)]"
      >
        {children}
      </div>
    </>
  )
}
