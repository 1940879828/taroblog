import Link from "next/link";
import { PageHeader } from "../_components";

const experiments = [
  {
    href: "/lab/routing/basics",
    title: "文件系统路由",
    desc: "文件夹 = URL 段，page.tsx 声明可访问入口，[slug] 动态段取 params。",
    watch: "访问 /basics/about 看静态段；访问 /basics/blog/任意值 看动态段取值。",
  },
  {
    href: "/lab/routing/layout-state",
    title: "布局状态保留",
    desc: "layout 包住子路由，切换子路由时 layout 不重新挂载。",
    watch: "在输入框打字 → 点链接切到 one/two → 输入框内容是否还在。",
  },
  {
    href: "/lab/routing/segments",
    title: "动态段 vs 捕获段",
    desc: "[slug] 单段、[...slug] 多段，匹配优先级：静态 > 动态 > 捕获。",
    watch: "访问 /segments/new（静态优先）、/segments/foo（动态）、/segments/foo/bar（捕获）。",
  },
  {
    href: "/lab/routing/group",
    title: "路由组 (folder)",
    desc: "括号文件夹不参与 URL，仅用于组织代码 / 共享 layout。",
    watch: "URL 里没有 (nav)/(noNav) 字样，但两个页面可以带不同外壳。",
  },
  {
    href: "/lab/routing/special-files",
    title: "约定文件 loading/error",
    desc: "loading.tsx 段级兜底，error.tsx 段级错误边界。",
    watch: "访问 /special-files/slow 看 loading；访问 /special-files/broken 看 error。",
  },
  {
    href: "/lab/routing/parallel",
    title: "并行路由 @slot",
    desc: "一个页面由多个 @slot 并行渲染，各自独立 loading、互不阻塞。",
    watch: "@analytics 先显示自己的 loading（延迟 1.5s），@team 和主内容立即显示。",
  },
  {
    href: "/lab/routing/intercepting",
    title: "拦截路由 (.)",
    desc: "同一 URL，从照片流点开用 Modal 覆盖，直接访问走整页。",
    watch: "从照片流点开 → Modal 覆盖（URL 变但页面没跳转）；刷新 → 整页。",
  },
];

export default function RoutingHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="CHAPTER 02"
        title="App Router 路由"
        desc="文件系统路由、匹配原理、layout 状态保留、并行/拦截路由。核心问题：URL 路径 ↔ 文件树 ↔ 组件树如何焊死成一套约定。"
      />

      <div className="grid gap-4">
        {experiments.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="block rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-emerald-500/60"
          >
            <h2 className="font-semibold text-emerald-300">{e.title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">{e.desc}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              <span className="text-slate-400">看什么：</span>
              {e.watch}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
