import { PageHeader } from "../../_components"
import FormBasicClient from "./form-client"

export default function FormBasicPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="05 · 实验 A"
        title="form 的 action：表单不再需要 fetch"
        desc="把 Server Action 直接塞进 <form action>。提交表单不用 fetch、不用 e.preventDefault()、不用手动 JSON 序列化——这就是 Server Action 最核心的价值。"
      />

      <FormBasicClient />

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <code>useActionState</code> 是 React 19 的 hook，用于绑定{" "}
            <code>&lt;form action&gt;</code> 并拿到提交结果与 pending 状态。
          </li>
          <li>
            <strong>渐进增强</strong>：即使没有 JS，
            <code>&lt;form action&gt;</code> 也能把数据提交到服务端 —— Server
            Action 天然支持这一点。
          </li>
          <li>
            不需要为"提交表单"单独写一个 <code>route.ts</code> 或客户端{" "}
            <code>fetch</code> 逻辑。
          </li>
        </ul>
      </div>
    </div>
  )
}
