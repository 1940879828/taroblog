"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { refreshData } from "./actions"

export default function RefreshClient() {
  const router = useRouter()
  const [lastRefresh, setLastRefresh] = useState<string>("（尚未操作）")

  const handleClick = async () => {
    // 1. 调 Server Action：内部 revalidatePath 清数据缓存 + 完整路由缓存
    const res = await refreshData()
    setLastRefresh(res.refreshedAt)
    // 2. router.refresh()：刷新路由器缓存，让当前页重新拉 RSC，拿到新值
    router.refresh()
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        模拟"写入后刷新数据"
      </button>
      <p className="text-xs text-slate-500">
        上次操作：{lastRefresh}。点击后上方"当前值"会变化（缓存被 revalidatePath
        清掉）。
      </p>
    </div>
  )
}
