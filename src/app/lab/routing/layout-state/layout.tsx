"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

export default function LayoutStateLayout({ children }: { children: ReactNode }) {
  const [text, setText] = useState("");
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="text-sm text-slate-400">
          这是 <code className="text-emerald-300">layout.tsx</code>（持久外壳）。在输入框打字，再点下面链接切换子路由，看输入内容是否保留：
        </p>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在这里打字，然后切换子路由"
          className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <p className="mt-2 text-xs text-slate-500">
          当前路径：<span className="text-emerald-300">{pathname}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/lab/routing/layout-state/one" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          子路由 one
        </Link>
        <Link href="/lab/routing/layout-state/two" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          子路由 two
        </Link>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="mb-2 text-xs text-slate-500">下面是 page（每次切换会替换）：</p>
        {children}
      </div>
    </div>
  );
}
