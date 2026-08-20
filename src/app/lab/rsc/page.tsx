import Link from "next/link"
import { PageHeader } from "../_components"

const experiments = [
  {
    href: "/lab/rsc/server-data",
    title: "Server 组件取数",
    desc: "服务端组件直接 await 取数，数据进 HTML、不暴露接口。",
    watch:
      "右键查看网页源码，能看到数据已经渲染进 HTML；Network 里没有额外的数据请求。"
  },
  {
    href: "/lab/rsc/client-boundary",
    title: "use client 边界",
    desc: "'use client' 声明客户端边界，组件有状态和事件。",
    watch: "点按钮数字变化；右键源码，这个组件也被 SSR 出了初始 HTML。"
  },
  {
    href: "/lab/rsc/window-pitfall",
    title: "window 坑",
    desc: "服务端组件访问 window 会报错，正确写法用 useEffect 包住。",
    watch:
      "对比两个区域：服务端直接读 window 会报错，客户端 useEffect 读则正常。"
  },
  {
    href: "/lab/rsc/hybrid",
    title: "混合树",
    desc: "Server import Client，以及服务端组件通过 children 嵌入客户端组件。",
    watch: "看服务端组件的内容在 HTML 里，客户端组件的交互正常。"
  },
  {
    href: "/lab/rsc/daisyui-dropdown",
    title: "手写下拉：谁发 JS",
    desc: "一个下拉拆成「客户端外壳」+「服务端内容」，只有外壳发 JS。",
    watch: "点按钮看交互；对比哪些部分是服务端渲染、哪些是客户端逻辑。"
  },
  {
    href: "/lab/rsc/waterfall",
    title: "瀑布流：服务端取数 + 客户端算列数",
    desc: "卡片服务端渲染进 HTML，列数由客户端按 window.innerWidth 计算。",
    watch: "拖动窗口看列数变化；右键源码看卡片内容已进 HTML。"
  },
  {
    href: "/lab/rsc/swr-waterfall",
    title: "SWR 版瀑布流：加载更多",
    desc: "分层取数：第一页服务端用 unstable_cache 取数，后续页客户端用 useSWRInfinite 加载。",
    watch:
      "首屏第一页来自服务端 HTML；滚动到底触发 /api/waterfall-items?page=N 请求并追加。"
  }
]

export default function RscHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="CHAPTER 03"
        title="React Server Components"
        desc="RSC vs SSR、'use client' 边界、Server 组件限制、window 坑。核心问题：哪些代码、数据、依赖会被发给浏览器。"
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
