"use client";

import { useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
      <p className="text-xs text-emerald-300">&apos;use client&apos; 客户端组件</p>
      <p className="mt-2 text-sm text-slate-300">当前计数：{count}</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="mt-3 rounded-lg border border-emerald-400 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
      >
        点我 +1
      </button>
    </div>
  );
}
