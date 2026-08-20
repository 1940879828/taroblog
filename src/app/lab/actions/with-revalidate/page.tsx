import { unstable_cache } from "next/cache"
import { PageHeader, Result } from "../../_components"
import RefreshClient from "./refresh-client"

// 被缓存的数据：模拟"数据库里的当前状态"。默认被 unstable_cache 缓存（跨请求复用）。
const getCurrentData = unstable_cache(
  async () => ({
    value: Math.floor(Math.random() * 10000),
    cachedAt: new Date().toISOString()
  }),
  ["with-revalidate-data"]
)

export default async function WithRevalidatePage() {
  const data = await getCurrentData()

  return (
    <div className="space-y-6">
      <PageHeader
        no="05 · 实验 E"
        title="Server Action 里 revalidatePath"
        desc="Server Action 写操作后调用 revalidatePath，让对应路由的数据缓存 + 完整路由缓存失效，UI 立刻拿到新数据。这联动第 4 章的缓存机制。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result
          label="当前值（被 unstable_cache 缓存）"
          value={String(data.value)}
        />
        <Result label="缓存时间" value={data.cachedAt} />
      </div>

      <RefreshClient />

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            Server Action 是唯一"既能写数据、又能让缓存失效"的地方 ——
            它天然知道该失效哪个路由。
          </li>
          <li>
            <code>revalidatePath</code> 清的是
            <strong>数据缓存 + 完整路由缓存</strong>； 客户端还要{" "}
            <code>router.refresh()</code> 刷新<strong>路由器缓存</strong>
            ，三者配合才能立即看到新数据。
          </li>
          <li>这比"客户端 fetch + 手动刷新页面"更安全、更少一次往返。</li>
        </ul>
      </div>
    </div>
  )
}
