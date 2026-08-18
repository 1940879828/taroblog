import { Note, PageHeader, Result } from "../../_components";

// 强制动态渲染：每次请求都在服务器重新运行组件
export const dynamic = "force-dynamic";

export default async function SsrPage() {
  // 在服务端组件里执行：每次请求都会重新计算（async 组件可 await 数据，见第 4 章）
  const renderedAt = new Date().toISOString();

  return (
    <div className="space-y-6">
      <PageHeader
        no="01 · 实验 B"
        title="SSR 服务端渲染"
        desc="每次请求，服务器运行 React 组件生成完整 HTML 返回；数据在服务器获取，HTML 里直接有内容。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Result label="本次渲染时间（每次请求都会变）" value={renderedAt} />
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">如何验证这是服务端渲染</p>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-300">
            <li>右键“查看网页源码”：下面这句话直接出现在 HTML 里。</li>
            <li>Network 面板：响应返回的是一整页 HTML。</li>
            <li>build 日志中该路由标记为 <code className="text-emerald-300">ƒ</code>（Dynamic）。</li>
          </ul>
        </div>
      </div>

      <Note title="与 CSR 的本质差异">
        同样打印时间：CSR 的时间来自浏览器时钟，SSR 的时间来自服务器时钟。
        更重要的是 —— SSR 时"数据获取"发生在服务器，HTML 里就已经有数据；
        CSR 时数据区在初始 HTML 里是空的，要等浏览器端请求。
        注意：<strong>SSR 只保证内容可见，页面可交互仍要等 JS 水合完成</strong>（见水合实验）。
      </Note>
    </div>
  );
}
