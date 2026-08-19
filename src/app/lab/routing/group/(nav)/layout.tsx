import type { ReactNode } from "react";

export default function NavGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-200">
        (nav) 组 layout —— 带"导航栏"外壳
      </div>
      {children}
    </div>
  );
}
