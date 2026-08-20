import Link from "next/link"
import { PageHeader } from "../_components"

const experiments = [
  {
    href: "/lab/actions/form-basic",
    title: "form 的 action（渐进增强）",
    desc: "<form action={serverAction}>：没有 JS 也能提交，表单数据进服务端函数。",
    watch: "提交表单后数据被服务端处理并回显；关掉 JS 仍可提交。"
  },
  {
    href: "/lab/actions/use-action-state",
    title: "useActionState 管理状态",
    desc: "useActionState 处理提交中 loading、返回值、表单状态。",
    watch: "点提交后看到 pending 状态、服务端返回的错误/成功信息。"
  },
  {
    href: "/lab/actions/event-handler",
    title: "事件处理器调用",
    desc: "在 onClick 等事件里直接 await 一个 Server Action。",
    watch: "点按钮触发服务端函数，看到返回值；与 API Route 的 fetch 对比。"
  },
  {
    href: "/lab/actions/vs-api-route",
    title: "Server Action vs API Route",
    desc: "同样一个'提交'，一边用 Server Action，一边用 route.ts + fetch。",
    watch: "对比两者的写法、请求来源、以及谁帮你刷新了 UI。"
  },
  {
    href: "/lab/actions/with-revalidate",
    title: "Action 里 revalidatePath",
    desc: "Server Action 里调用 revalidatePath，联动第 4 章的数据缓存。",
    watch: "提交后立刻看到数据更新（数据缓存 + 路由缓存被清）。"
  }
]

export default function ActionsHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="CHAPTER 05"
        title="Server Actions"
        desc="'use server' 原理、与 API Route 的区别、渐进增强、useActionState、与缓存联动。核心问题：一个能被客户端直接调用的服务端函数，到底解决了什么。"
      />

      <div className="grid gap-4">
        {experiments.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="block rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-emerald-500/60"
          >
            <h2 className="font-semibold text-emerald-300">{e.title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">{e.desc}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              <span className="text-slate-400">看什么：</span>
              {e.watch}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
