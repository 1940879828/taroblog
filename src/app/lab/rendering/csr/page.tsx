import { Note, PageHeader } from "../../_components";
import { ClientData } from "./client";

export const dynamic = "force-dynamic";

export default function CsrPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="01 · 实验 A"
        title="CSR 客户端渲染"
        desc="浏览器请求到一个几乎空的 HTML，JS 下载执行后内容才出现，数据在浏览器端请求。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">服务端渲染的部分（随 HTML 一起返回）</p>
          <p className="mt-1 text-sm text-slate-300">
            这句话在请求响应里直接存在，无需等 JS。
          </p>
          <p className="mt-2 font-mono text-xs text-slate-500">
            服务端时间：{new Date().toISOString()}
          </p>
        </div>
        <ClientData />
      </div>

      <Note title="怎么观察">
        <ul className="list-disc space-y-1 pl-4">
          <li>打开页面：左侧立即出现，右侧 loading 约 800ms 后出现（浏览器执行 useEffect 后）。</li>
          <li>右键“查看网页源码”：能看到左侧内容，右侧数据区为空 —— HTML 里没有它。</li>
          <li>刷新页面：loading 状态重新出现 —— 因为组件在客户端重新挂载，请求重新发生。</li>
        </ul>
      </Note>
    </div>
  );
}
