"use client"

import { useRouter } from "next/navigation"
import { revalidateLabData } from "./action"

export default function RefreshButton() {
  const router = useRouter()

  const handleClick = async () => {
    // 触发 Server Action：清掉数据缓存（含完整路由缓存）
    await revalidateLabData()
    // 让客户端重新拉一次当前路由的 RSC，立即看到新数据
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
    >
      触发 revalidateTag 刷新数据
    </button>
  )
}
