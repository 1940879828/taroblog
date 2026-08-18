import { Note, PageHeader, Result } from "../../_components"

// 强制静态渲染：仅在构建时运行一次
export const dynamic = "force-static"

// 在组件内读取"渲染时刻"：静态页面构建时渲染一次，此后请求都返回这份 HTML
const renderedAt = new Date().toISOString()

export default function SsgPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="01 · 实验 C"
        title="SSG 静态生成"
        desc="构建时生成一次 HTML，之后所有请求直接返回同一份静态文件，数据冻结在构建时刻。"
      />

      <Result label="渲染时间（构建时冻结，不会变化）" value={renderedAt} />

      <Note title="怎么观察">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            <code className="text-emerald-300">pnpm dev</code>：时间每次刷新都变
            —— 开发模式不做静态化，属正常。
          </li>
          <li>
            <code className="text-emerald-300">pnpm build</code>
            ：日志中该路由标记为 <code className="text-emerald-300">○</code>
            （Static），并在{" "}
            <code className="text-emerald-300">
              .next/server/app/lab/rendering/ssg.html
            </code>{" "}
            生成静态文件。 （注意：<code className="text-emerald-300">○</code>{" "}
            才是"静态预渲染"，<code className="text-emerald-300">●</code> 是用了{" "}
            <code>generateStaticParams</code> 的 SSG。）
          </li>
          <li>
            <code className="text-emerald-300">pnpm start</code>{" "}
            后多次刷新：时间戳始终不变。
          </li>
        </ul>
      </Note>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">实测结果（Next 16 · pnpm build）</p>
        <p className="mt-1">
          根 layout 已避免使用 <code>cookies()</code> 动态 API；本页写了{" "}
          <code>export const dynamic = "force-static"</code>，build
          日志中应标记为 <code>○</code>（Static）。主题首屏同步由 head
          内联脚本完成，不影响本页静态预渲染。
        </p>
      </div>
    </div>
  )
}
