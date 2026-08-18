"use client";

import { useEffect, useState } from "react";

export function HydrationDemo() {
  const [count, setCount] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // 该 effect 只在浏览器执行 → 执行完即代表"水合完成"（事件已附加、状态可用）
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-slate-500">水合状态：</span>
        <span
          className={`rounded px-2 py-0.5 text-xs font-semibold ${
            hydrated ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {hydrated ? "已水合（可交互）" : "等待 JS 水合…"}
        </span>
        <span className="text-xs text-slate-500">window：</span>
        <code className="text-xs text-slate-300">{typeof window}</code>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          点我 +1
        </button>
        <span className="font-mono text-2xl text-emerald-300">{count}</span>
        <span className="text-xs text-slate-500">
          （水合前点击无效，水合后计数器可用）
        </span>
      </div>

      {hydrated ? (
        <p className="text-sm text-slate-300">
          客户端时钟（仅浏览器存在，水合后才安全渲染）：
          <code className="ml-1 text-emerald-300">{new Date().toLocaleTimeString()}</code>
        </p>
      ) : (
        <p className="text-sm text-slate-500">
          （客户端时钟在服务端渲染阶段不可用 —— 用 hydrated 标记延迟渲染，避免水合不匹配）
        </p>
      )}
    </div>
  );
}
