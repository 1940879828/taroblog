"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function ClientDropdown({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 hover:border-emerald-500/60"
      >
        点击展开菜单 {open ? "▲" : "▼"}
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-10 mt-1 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}
