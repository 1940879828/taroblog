import { unstable_cache } from "next/cache"
import { getRawData } from "../_data"
import { Note, PageHeader, Result } from "../../_components"

// 把取数包进 unstable_cache，不设 revalidate：数据进数据缓存、页面进完整路由缓存。
// 对应 fetch 的 force-cache（显式加入缓存）。
const getCachedData = unstable_cache(getRawData, ["lab-data-cached"])

export default async function FetchCachePage() {
  const data = await getCachedData()

  return (
    <div className="space-y-6">
      <PageHeader
        no="04 · 实验 B"
        title="数据缓存：跨请求复用"
        desc="用 unstable_cache 包住取数（不设 revalidate），数据进数据缓存、页面进完整路由缓存，跨请求复用。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result
          label="数据生成时间（构建后冻结，刷新不变）"
          value={data.generatedAt}
        />
        <Result
          label="随机数（构建后冻结，刷新不变）"
          value={String(data.random)}
        />
      </div>

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            <code>pnpm build</code>：本页标记为 <code>○</code>（Static），并在{" "}
            <code>.next/server/app/lab/data/fetch-cache.html</code> 生成静态文件。
          </li>
          <li>
            <code>pnpm start</code> 后多次刷新：时间戳、随机数都
            <strong>不变</strong> —— 命中了数据缓存 + 完整路由缓存。
          </li>
          <li>
            想让数据刷新：调用 <code>revalidateTag</code> /{" "}
            <code>revalidatePath</code>（见实验 D），或加时间重新验证（见实验 C）。
          </li>
        </ol>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <p className="mt-1">
          数据一旦进缓存，跨请求、跨部署持久化，直到被重新验证或主动退出。
          这正是"改了数据源，页面却迟迟不更新"的根因 —— 缓存没失效。
        </p>
      </div>
    </div>
  )
}
