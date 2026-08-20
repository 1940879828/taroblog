import { PageHeader } from "../../_components"
import CompareClient from "./compare-client"

export default function VsApiRoutePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="05 · 实验 D"
        title="Server Action vs API Route"
        desc="同一个'提交一段文本回显'，左边用 API Route + fetch，右边用 Server Action。对比两者的写法与请求来源。"
      />

      <CompareClient />

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <strong>API Route</strong>：要自己定义 <code>route.ts</code>
            、在客户端 <code>fetch</code>、手动 <code>JSON.stringify</code>
            、手动处理 HTTP 状态码。
          </li>
          <li>
            <strong>Server Action</strong>：一个 <code>"use server"</code>{" "}
            函数即可，
            客户端像调本地函数一样调用；还能直接访问数据库/密钥，且能联动{" "}
            <code>revalidatePath</code> 刷新 UI。
          </li>
          <li>
            何时仍用 API Route：需要被<strong>第三方/非 Next 客户端</strong>
            调用的公开接口 （如给移动端、外部服务），或需要精细控制 HTTP
            语义时。
          </li>
        </ul>
      </div>
    </div>
  )
}
