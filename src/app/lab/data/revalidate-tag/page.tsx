import { unstable_cache } from "next/cache"
import { getRawData } from "../_data"
import { Note, PageHeader, Result } from "../../_components"
import RefreshButton from "./refresh-button"

// 打标签并缓存：配合 Server Action 里的 revalidateTag 按需失效
const getCachedData = unstable_cache(getRawData, ["lab-data-tag"], {
  tags: ["lab-data-tag"],
})

export default async function RevalidateTagPage() {
  const data = await getCachedData()

  return (
    <div className="space-y-6">
      <PageHeader
        no="04 · 实验 D"
        title="标签失效 revalidateTag"
        desc="unstable_cache 打 tags，配合 Server Action 里的 revalidateTag 按需清缓存。这是'改了数据立刻更新'的正解。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="数据生成时间" value={data.generatedAt} />
        <Result label="随机数" value={String(data.random)} />
      </div>

      <RefreshButton />

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            <code>pnpm build</code> 后 <code>pnpm start</code>：数据被缓存，刷新页面时间不变。
          </li>
          <li>
            点击上方按钮 → 触发 Server Action 调 <code>revalidateTag("lab-data-tag")</code> →{" "}
            数据缓存 + 完整路由缓存被清 → 再 <code>router.refresh()</code> 重新拉取，时间立刻更新。
          </li>
        </ol>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <p className="mt-1">
          <code>revalidateTag</code> 按"标签"清一批缓存，<code>revalidatePath</code> 按"路径"清。
          两者都必须在服务端上下文（Server Action / Route Handler）调用，客户端只能通过 Server Action 触发，
          再配合 <code>router.refresh()</code> 立即看到新数据（详见第 5 章 Server Actions）。
        </p>
      </div>
    </div>
  )
}
