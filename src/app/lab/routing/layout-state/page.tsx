import Link from "next/link";

export default function LayoutStateIndex() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-400">
        这是 <code>layout-state</code> 的首页。点下面链接进入子路由 one / two：
      </p>
      <div className="flex gap-3">
        <Link href="/lab/routing/layout-state/one" className="text-emerald-300 underline underline-offset-4">
          去 one
        </Link>
        <Link href="/lab/routing/layout-state/two" className="text-emerald-300 underline underline-offset-4">
          去 two
        </Link>
      </div>
    </div>
  );
}
