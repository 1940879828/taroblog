import { unstable_cache } from "next/cache"
import { getRawData } from "../_data"
import { Note, PageHeader, Result } from "../../_components"

// 裸函数：每次调用都重新执行（相当于"不缓存"）
// 用 unstable_cache 包一层：跨请求复用（相当于"缓存"）
const getCachedValue = unstable_cache(getRawData, ["lab-data-cache"], {
  revalidate: 30,
})

export default async function UnstableCachePage() {
  // 同一次渲染里分别取一次：裸函数结果 vs 缓存函数结果
  const [raw, cached] = await Promise.all([getRawData(), getCachedValue()])

  return (
    <div className="space-y-6">
      <PageHeader
        no="04 · 实验 E"
        title="unstable_cache 缓存非 fetch 数据"
        desc="不是所有数据都来自 fetch（如直接查数据库）。用 unstable_cache 手动包一层，也能享受数据缓存。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="裸函数结果（每次执行都变）" value={raw.generatedAt} />
        <Result label="缓存函数结果（30 秒内复用）" value={cached.generatedAt} />
      </div>

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            <code>pnpm build</code> 后 <code>pnpm start</code>：刷新页面，
            右侧"缓存函数结果"在 30 秒内不变 —— 命中了数据缓存；左侧"裸函数结果"每次执行都不同。
          </li>
          <li>
            30 秒后的首次请求触发后台重建，缓存值才更新。
          </li>
          <li>
            代码里打了 <code>tags</code>（或这里用 <code>revalidate</code>），可用{" "}
            <code>revalidateTag</code> 主动清掉（见实验 D）。
          </li>
        </ol>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <p className="mt-1">
          <code>unstable_cache</code> 是 <code>fetch</code> 缓存能力的"通用版"：任何异步函数都能包进去，
          配合 <code>revalidate</code>（时间）和 <code>tags</code>（标签）使用。
          Next 15+ 官方也推荐用它在服务端组件里缓存非 fetch 数据。
        </p>
      </div>
    </div>
  )
}
