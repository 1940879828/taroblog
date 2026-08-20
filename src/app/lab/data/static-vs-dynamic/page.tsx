import { unstable_cache } from "next/cache"
import { getRawData } from "../_data"
import { Note, PageHeader, Result } from "../../_components"

// 强制动态：让页面每次请求都重新执行取数逻辑，
// 这样"裸取数（每次变）"和"缓存取数（unstable_cache 命中，不变）"的对比才有意义。
// 说明：即使页面是动态渲染，unstable_cache 的数据缓存仍然独立生效 —— 这就是"动态渲染 + 用缓存数据"。
export const dynamic = "force-dynamic"

// 缓存版：数据进数据缓存（跨请求复用），与页面是否动态渲染无关
const getCachedData = unstable_cache(getRawData, ["lab-data-static"])

export default async function StaticVsDynamicPage() {
  // 左侧：裸取数（每次请求新数据，动态侧）
  const dynamicData = await getRawData()
  // 右侧：缓存取数（复用，静态侧）
  const staticData = await getCachedData()

  return (
    <div className="space-y-6">
      <PageHeader
        no="04 · 实验 F"
        title="静态 vs 动态 对比"
        desc="同一数据源、同一页面里，一边裸取数（动态）、一边走缓存（静态），直观对比静态与动态的差异。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-orange-500/40 bg-orange-500/10 p-4">
          <p className="text-xs text-orange-300">裸取数（动态，ƒ）</p>
          <p className="mt-1 font-mono text-sm text-orange-200">
            时间：{dynamicData.generatedAt}
          </p>
          <p className="mt-1 text-xs text-orange-200/70">
            每次请求都重新执行，刷新时时间变。
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-xs text-emerald-300">缓存取数（静态，○）</p>
          <p className="mt-1 font-mono text-sm text-emerald-200">
            时间：{staticData.generatedAt}
          </p>
          <p className="mt-1 text-xs text-emerald-200/70">
            构建后冻结，刷新时时间不变。
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="动态侧随机数" value={String(dynamicData.random)} />
        <Result label="静态侧随机数" value={String(staticData.random)} />
      </div>

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            <code>pnpm build</code>：本页标记为 <code>ƒ</code>（Dynamic）—— 因为这里显式写了{" "}
            <code>export const dynamic = "force-dynamic"</code>，让页面每次请求都重新渲染。
          </li>
          <li>
            <code>pnpm start</code> 后刷新：左侧（裸取数）时间每次变，右侧（缓存取数）时间不变
            —— 右侧数据进了 <code>unstable_cache</code> 数据缓存，即使页面动态渲染也命中。
          </li>
        </ol>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <p className="mt-1">
          <strong>动态渲染 ≠ 不缓存数据</strong>。这里页面是动态的（每次重新渲染），但右侧数据走了{" "}
          <code>unstable_cache</code>，所以数据仍被缓存、跨请求复用。这正是"动态页面 + 缓存数据"的组合，
          也呼应 4.4 里"退出完整路由缓存不影响数据缓存"这一条。
        </p>
      </div>
    </div>
  )
}
