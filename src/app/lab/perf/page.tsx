import Link from "next/link"
import { PageHeader } from "../_components"

const experiments = [
  {
    href: "/lab/perf/image",
    title: "next/image 图片优化",
    desc: "next/image 自动处理尺寸、占位、懒加载，避免图片拖慢首屏。",
    watch: "看图片如何按尺寸渲染、懒加载触发、以及占位背景。"
  },
  {
    href: "/lab/perf/streaming",
    title: "流式渲染 Streaming",
    desc: "Suspense + loading.tsx：不用等整页算完，先吐骨架再流式填充。",
    watch: "慢速网络下先看到骨架屏，内容分块陆续出现（不阻塞整页）。"
  },
  {
    href: "/lab/perf/dynamic",
    title: "next/dynamic 动态导入",
    desc: "把不首屏需要的组件拆出去，减少首屏 JS 体积。",
    watch: "查看 Network 里 JS chunk：首屏只有核心 bundle，动态组件按需加载。"
  },
  {
    href: "/lab/perf/build",
    title: "读 next build 产物",
    desc: "○/●/ƒ 标记、.next 目录结构、如何定位 JS 体积。",
    watch: "pnpm build 后对照日志理解每个路由的渲染方式与产物。"
  }
]

export default function PerfHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="CHAPTER 06"
        title="性能 / 部署 / 工程化"
        desc="next/image、流式渲染、next/dynamic、next build 产物分析、部署与 Next 16 新特性。核心问题：怎么让页面更快、JS 更少、部署更顺。"
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
  )
}
