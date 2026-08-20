import { unstable_cache } from "next/cache"
import { getRawData } from "../_data"
import { Note, PageHeader, Result } from "../../_components"

// 基于时间的重新验证：数据最多缓存 10 秒，过期后首次请求后台刷新（SWR）
const getCachedData = unstable_cache(getRawData, ["lab-data-time"], {
  revalidate: 10,
})

export default async function RevalidateTimePage() {
  const data = await getCachedData()

  return (
    <div className="space-y-6">
      <PageHeader
        no="04 · 实验 C"
        title="时间重新验证（revalidate）"
        desc="unstable_cache(..., { revalidate: 10 })：最多缓存 10 秒，过期后首次请求先返回旧值、后台刷新。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="数据生成时间（约 10 秒变一次）" value={data.generatedAt} />
        <Result label="随机数（约 10 秒变一次）" value={String(data.random)} />
      </div>

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            <code>pnpm build</code>：本页标记为 <code>○</code>（Static）并带 revalidate 信息。
          </li>
          <li>
            <code>pnpm start</code> 后连刷：10 秒内时间戳不变（命中缓存），
            10 秒后的首次请求触发后台重建，之后才更新。
          </li>
        </ol>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <p className="mt-1">
          <code>revalidate: 10</code> 是"最多每 10 秒重建一次"，<strong>不是</strong>"每 10 秒必更新"。
          这是 stale-while-revalidate（SWR）：旧数据先顶上，后台异步刷新，用户几乎无感。
        </p>
      </div>
    </div>
  )
}
