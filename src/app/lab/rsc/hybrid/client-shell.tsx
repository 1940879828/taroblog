"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function ClientShell({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
      <p className="text-xs text-emerald-300">&apos;use client&apos; 客户端组件 ClientShell</p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-2 rounded-lg border border-emerald-400 px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-500/10"
      >
        点击切换 {open ? "收起" : "展开"}
      </button>
      <div className="mt-3">{open ? children : null}</div>
    </div>
  );
}
