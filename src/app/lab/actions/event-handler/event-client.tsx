"use client"

import { useState } from "react"
import { fetchServerTime } from "./actions"

export default function EventHandlerClient() {
  const [result, setResult] = useState<string>("（尚未点击）")
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      // 像调本地异步函数一样调用 Server Action
      const data = await fetchServerTime()
      setResult(data.serverTime)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
      >
        {loading ? "获取中…" : "获取服务端时间"}
      </button>

      <p className="rounded-xl border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-emerald-300">
        {result}
      </p>
    </div>
  )
}
