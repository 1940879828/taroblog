"use client"

import { useState } from "react"
import { echoText } from "./actions"

export default function CompareClient() {
  const [text, setText] = useState("")
  const [apiResult, setApiResult] = useState<string>("")
  const [actionResult, setActionResult] = useState<string>("")

  const callApiRoute = async () => {
    // 方式一：API Route —— 手动 fetch + JSON 序列化 + 处理响应
    const res = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    })
    const data = await res.json()
    setApiResult(JSON.stringify(data))
  }

  const callServerAction = async () => {
    // 方式二：Server Action —— 像调本地函数
    const data = await echoText(text)
    setActionResult(JSON.stringify(data))
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <label htmlFor="compare-text" className="block text-xs text-slate-400">
          输入一段文本
        </label>
        <input
          id="compare-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 rounded-xl border border-orange-500/40 bg-orange-500/10 p-4">
          <p className="text-xs font-semibold text-orange-300">
            API Route + fetch
          </p>
          <button
            type="button"
            onClick={callApiRoute}
            className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            用 fetch 调 /api/echo
          </button>
          <pre className="break-all whitespace-pre-wrap rounded-lg bg-slate-950 p-3 font-mono text-xs text-orange-200">
            {apiResult || "（未调用）"}
          </pre>
        </div>

        <div className="space-y-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-xs font-semibold text-emerald-300">
            Server Action
          </p>
          <button
            type="button"
            onClick={callServerAction}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            直接调用 echoText
          </button>
          <pre className="break-all whitespace-pre-wrap rounded-lg bg-slate-950 p-3 font-mono text-xs text-emerald-200">
            {actionResult || "（未调用）"}
          </pre>
        </div>
      </div>
    </div>
  )
}
