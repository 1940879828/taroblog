import Link from "next/link";

export default function GroupPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">路由组 (folder)</h1>
      <p className="text-sm leading-6 text-slate-400">
        括号文件夹不参与 URL，只用于组织代码 / 共享不同 layout。点击下面两个链接，注意地址栏 URL
        里<span className="text-emerald-300">没有 (nav) / (noNav) 字样</span>，但它们渲染的外壳不同：
      </p>
      <div className="flex gap-3">
        <Link href="/lab/routing/group/nav-home" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          (nav) 组页面
        </Link>
        <Link href="/lab/routing/group/no-nav-home" className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60">
          (noNav) 组页面
        </Link>
      </div>
    </div>
  );
}
