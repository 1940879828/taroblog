import Link from "next/link";

export default function BasicsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">文件系统路由</h1>
      <p className="text-sm leading-6 text-slate-400">
        当前路径是 <code className="text-emerald-300">/lab/routing/basics</code>
        ，对应文件 <code>app/lab/routing/basics/page.tsx</code>。点击下面的链接，观察 URL 段与文件树的映射：
      </p>
      <div className="flex gap-3">
        <Link href="/lab/routing/basics/about" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          静态段 /about
        </Link>
        <Link href="/lab/routing/basics/blog/hello-world" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          动态段 /blog/[slug]
        </Link>
      </div>
    </div>
  );
}
