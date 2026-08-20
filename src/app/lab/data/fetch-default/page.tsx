import { getRawData } from "../_data"
import { Note, PageHeader, Result } from "../../_components"

// 强制动态：每次请求都在服务器重新执行取数，拿到的始终是新数据。
// 对应"fetch 默认不缓存"的等价效果 —— 数据不进数据缓存。
export const dynamic = "force-dynamic"

export default async function FetchDefaultPage() {
  const data = await getRawData()

  return (
    <div className="space-y-6">
      <PageHeader
        no="04 · 实验 A"
        title="不缓存：每次请求新数据"
        desc="不写任何缓存，直接 await 取数。对应 Next 15+ 的 fetch 默认不缓存——数据每次请求都重新获取，页面被标记为动态（ƒ）。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="数据生成时间（每次刷新都变）" value={data.generatedAt} />
        <Result label="随机数（每次刷新都变）" value={String(data.random)} />
      </div>

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            <code>pnpm build</code>：本页在 build 日志中标记为 <code>ƒ</code>（Dynamic）。
          </li>
          <li>
            <code>pnpm start</code> 后连刷：每次时间戳、随机数都变 —— 数据没进缓存。
          </li>
        </ol>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <p className="mt-1">
          Next 14 及以前 fetch 默认 <code>force-cache</code>（隐式缓存）； Next
          15 起改为<strong>默认不缓存</strong>，必须显式声明缓存策略。
          这就是"服务端组件取了数却没拿到新数据"这个隐式陷阱被取消的原因。
          本实验用 <code>force-dynamic</code> + 裸取数来等价复现这个"不缓存"行为。
        </p>
      </div>
    </div>
  )
}
