"use client"

import dynamic from "next/dynamic"
import { useState } from "react"

// 注意：`ssr: false` 只能在**客户端组件**里使用（Next 16 规则）。
// 所以把 next/dynamic + ssr:false 放在这个 'use client' 组件里。
// HeavyWidget 不会进首屏 bundle，点击时才按需加载。
const HeavyWidget = dynamic(() => import("./heavy-widget"), {
  ssr: false,
  loading: () => (
    <p className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-slate-400">
      正在加载重量级组件…
    </p>
  )
})

export default function DynamicSection() {
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
      >
        {show ? "卸载重量级组件" : "加载重量级组件"}
      </button>

      <p className="text-xs text-slate-500">
        观察：首次点"加载"时，Network 面板会新出现一个独立的 JS
        chunk（重量级组件的代码）。 这就是 <code>next/dynamic</code>{" "}
        把大依赖拆出首屏的效果。
      </p>

      {show && <HeavyWidget />}
    </div>
  )
}
