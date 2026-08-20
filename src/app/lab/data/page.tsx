import Link from "next/link"
import { PageHeader } from "../_components"

const experiments = [
  {
    href: "/lab/data/fetch-default",
    title: "不缓存：每次请求新数据",
    desc: "force-dynamic + 裸取数，对应 Next 15+ fetch 默认不缓存。",
    watch: "pnpm build 后本页标记为 ƒ（动态）；每次刷新时间戳都变。"
  },
  {
    href: "/lab/data/fetch-cache",
    title: "数据缓存：跨请求复用",
    desc: "unstable_cache 包住取数（无 revalidate），对应 fetch 的 force-cache。",
    watch: "pnpm build 后本页标记为 ○（静态）；刷新时间戳冻结在构建时刻。"
  },
  {
    href: "/lab/data/revalidate-time",
    title: "时间重新验证",
    desc: "unstable_cache(..., { revalidate: 10 }) 基于时间的 SWR 刷新。",
    watch: "过期后首次请求返回旧值并后台重建；约 10 秒后时间才变。"
  },
  {
    href: "/lab/data/revalidate-tag",
    title: "标签失效 revalidateTag",
    desc: "unstable_cache 打 tags，配合 Server Action 里 revalidateTag 按需清缓存。",
    watch:
      "点按钮触发 Server Action 后，数据立刻更新（数据缓存 + 路由器缓存被清）。"
  },
  {
    href: "/lab/data/unstable-cache",
    title: "unstable_cache 缓存非 fetch 数据",
    desc: "对比裸函数（每次变）与 unstable_cache（跨请求复用）。",
    watch:
      "pnpm build 后刷新，右侧缓存值不变（命中数据缓存），左侧裸函数值每次变。"
  },
  {
    href: "/lab/data/static-vs-dynamic",
    title: "静态 vs 动态 对比",
    desc: "同一数据源，一边裸取数（动态），一边走缓存（静态）。",
    watch: "build 日志一个 ƒ 一个 ○；刷新时左侧时间变、右侧不变。"
  }
]

export default function DataHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="CHAPTER 04"
        title="数据获取与缓存"
        desc="fetch 策略、四层缓存、revalidate、静态 vs 动态。核心问题：哪一层缓存了什么、谁能让谁失效。"
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
