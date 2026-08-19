import type { ReactNode } from "react";

export default function NoNavGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-xs text-sky-200">
        (noNav) 组 layout —— 无导航栏外壳
      </div>
      {children}
    </div>
  );
}
