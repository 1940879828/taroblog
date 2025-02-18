"use client"

import { MessageList } from "@/components/Message"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const MountMessageList = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return <>{mounted && createPortal(<MessageList />, document.body)}</>
}

export default MountMessageList
