import Link from "next/link";

export default function SegmentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">动态段 vs 捕获段</h1>
      <p className="text-sm leading-6 text-slate-400">
        匹配优先级：<span className="text-emerald-300">静态段 &gt; 动态段 [slug] &gt; 捕获段 [...slug]</span>。
        下面三个链接分别命中不同的路由规则：
      </p>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/lab/routing/segments/new" className="text-emerald-300 underline underline-offset-4">
            /segments/new
          </Link>
          <span className="ml-2 text-slate-500">→ 命中静态段 new/page.tsx（即使 [slug] 也能匹配，静态优先）</span>
        </li>
        <li>
          <Link href="/lab/routing/segments/foo" className="text-emerald-300 underline underline-offset-4">
            /segments/foo
          </Link>
          <span className="ml-2 text-slate-500">→ 命中动态段 [slug]/page.tsx</span>
        </li>
        <li>
          <Link href="/lab/routing/segments/docs/a/b" className="text-emerald-300 underline underline-offset-4">
            /segments/docs/a/b
          </Link>
          <span className="ml-2 text-slate-500">→ 命中捕获段 docs/[...slug]/page.tsx（多段）</span>
        </li>
      </ul>
    </div>
  );
}
