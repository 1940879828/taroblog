import type { ReactNode } from "react";

export default function ParallelLayout({
  children,
  analytics,
  team,
}: {
  children: ReactNode;
  analytics: ReactNode;
  team: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">{children}</div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-5">
          <p className="mb-2 text-xs text-emerald-300">slot @analytics（独立渲染，带自己的 loading）</p>
          {analytics}
        </div>
        <div className="rounded-xl border border-sky-500/40 bg-sky-500/5 p-5">
          <p className="mb-2 text-xs text-sky-300">slot @team（独立渲染）</p>
          {team}
        </div>
      </div>
    </div>
  );
}
