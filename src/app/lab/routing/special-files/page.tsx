import Link from "next/link";

export default function SpecialFilesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">约定文件 loading / error</h1>
      <p className="text-sm leading-6 text-slate-400">
        <code>loading.tsx</code> 是段级 Suspense 兜底，<code>error.tsx</code> 是段级错误边界。点击：
      </p>
      <div className="flex gap-3">
        <Link href="/lab/routing/special-files/slow" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          /slow → 触发 loading
        </Link>
        <Link href="/lab/routing/special-files/broken" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          /broken → 触发 error
        </Link>
      </div>
      <p className="text-xs text-slate-500">
        提示：loading 只在导航切换段时短暂出现；broken 页会抛错并被 error.tsx 兜底。
      </p>
    </div>
  );
}
