import { PageHeader } from "../../_components"
import EventHandlerClient from "./event-client"

export default function EventHandlerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="05 · 实验 C"
        title="事件处理器里调用 Server Action"
        desc="除了 <form action>，Server Action 也能在 onClick 等事件处理器里直接 await 调用，像调一个本地异步函数一样。"
      />

      <EventHandlerClient />

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            事件处理器方式<strong>没有渐进增强</strong>（必须 JS
            运行才能触发）； 需要"无 JS 也能用"的场景用{" "}
            <code>&lt;form action&gt;</code>。
          </li>
          <li>
            它比 <code>fetch("/api/xxx")</code> 的优势：不用定义 API route、
            不用处理 JSON 序列化、能直接访问服务端资源（数据库/密钥/内部 API）。
          </li>
        </ul>
      </div>
    </div>
  )
}
