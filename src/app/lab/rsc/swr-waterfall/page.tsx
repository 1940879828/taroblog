import { unstable_cache } from "next/cache"
import SwrWaterfallClient from "./client"

// ── 服务端侧取数（本章强调的核心点）────────────────────────────
// 服务端组件里要拿数据，就用 Next 强化过的取数方式：
//   · fetch(url, { cache / next.revalidate / next.tags })：能接入 Next 缓存
//   · unstable_cache(fn, key, { revalidate / tags })：缓存非 fetch 的任意异步结果
// 这里用 unstable_cache 包住"取第一页数据"的查询，首屏直接渲染进 HTML。
// 注：真实项目这里通常是一个数据库查询或 fetch 一个数据接口；
// 本实验为了稳定（不依赖本地端口）内联生成与 /api/waterfall-items 相同的分页数据。
const PAGE_SIZE = 8

const getFirstPage = unstable_cache(async () => {
  const items = Array.from({ length: PAGE_SIZE }, (_, i) => {
    const id = i + 1
    return { id, title: `卡片 ${id}`, height: 120 + ((id * 37) % 160) }
  })
  return {
    page: 1,
    pageSize: PAGE_SIZE,
    total: 30,
    hasMore: true,
    items
  }
}, ["swr-waterfall-first-page"])

export default async function SwrWaterfallPage() {
  // 服务端组件：在服务器取好"第一页"，直接渲染进 HTML（首屏快 + SEO 可抓）
  const firstPage = await getFirstPage()

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">SWR 版瀑布流：加载更多</h1>
      <p className="text-sm leading-6 text-slate-400">
        经典分层取数：<strong>第一页</strong>由<strong>服务端组件</strong>用
        Next 强化 <code className="text-emerald-300">unstable_cache</code>{" "}
        取数、SSR 渲染进 HTML；<strong>后续页</strong>由<strong>客户端</strong>
        组件 用 <code className="text-emerald-300">useSWRInfinite</code>{" "}
        在滚动触底时加载。
      </p>

      {/* 客户端组件：预填第一页数据（fallback），从第二页起由 SWR 加载 */}
      <SwrWaterfallClient firstPage={firstPage} />

      <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm leading-6 text-sky-100">
        <p className="font-semibold text-sky-200">服务端侧取数（关键认知）</p>
        <p className="mt-1 text-sky-100/80">
          服务端组件拿数据 <strong>不用 axios</strong>，用 Next 强化过的{" "}
          <code>fetch</code> 或 <code>unstable_cache</code> ——
          因为只有它们能接入 Next 的四层缓存（第 4 章）。axios 请求的结果不会被
          Next 缓存，只在客户端用。
        </p>
      </div>
    </div>
  )
}
