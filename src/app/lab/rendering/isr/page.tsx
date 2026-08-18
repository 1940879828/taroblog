import { Note, PageHeader, Result } from "../../_components"

// ISR：构建时静态生成，之后每 10 秒最多重建一次（过期后的首次请求触发，期间先返回旧版）
export const revalidate = 10

export default function IsrPage() {
  const renderedAt = new Date().toISOString()

  return (
    <div className="space-y-6">
      <PageHeader
        no="01 · 实验 D"
        title="ISR 增量静态再生成"
        desc="构建时生成静态 HTML；超过 revalidate 周期后的首次请求，先返回旧缓存、再在后台重建新页（stale-while-revalidate 思路）。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="渲染时间（每 10 秒重建一次）" value={renderedAt} />
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm leading-6 text-slate-300">
          <p className="text-xs text-slate-500">关键认知</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>
              <code>revalidate: 10</code> 不是"每 10 秒必更新"，而是"最多每 10
              秒重建一次"。
            </li>
            <li>10 秒内所有请求直接命中旧缓存，响应极快、服务器不渲染。</li>
            <li>重建是后台异步完成，用户拿到的始终是"上一个周期"的内容。</li>
          </ul>
        </div>
      </div>

      <Note title="怎么观察（必须生产模式）">
        <ol className="list-decimal space-y-1 pl-4">
          <li>
            先 <code>pnpm build</code>：在 build 日志里找到本页 —— 应标记为{" "}
            <code>○</code>（Static）并带 revalidate 信息。
          </li>
          <li>
            根 layout 没有使用 <code>cookies()</code> 动态
            API，主题同步不会把本页拖成动态； 本页的 <code>revalidate</code>{" "}
            可以按 ISR 语义生效。
          </li>
          <li>
            <code>pnpm start</code> 后连刷：约 10 秒内时间不变，10
            秒后的首次请求触发后台重建，之后才变。
          </li>
        </ol>
      </Note>
    </div>
  )
}
