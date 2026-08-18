import type { ReactNode } from "react";

export function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm leading-6 text-sky-100">
      {title && <p className="font-semibold text-sky-200">{title}</p>}
      <div className="mt-1 text-sky-100/80">{children}</div>
    </div>
  );
}

export function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-all font-mono text-lg text-emerald-300">{value}</p>
    </div>
  );
}

export function PageHeader({
  no,
  title,
  desc,
}: {
  no: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-6">
      <p className="font-mono text-xs text-emerald-400">{no}</p>
      <h1 className="mt-1 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>
    </div>
  );
}
