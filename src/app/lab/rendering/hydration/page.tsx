import { Note, PageHeader } from "../../_components";
import { HydrationDemo } from "./client";

export const dynamic = "force-dynamic";

export default function HydrationPage() {
  // 服务端渲染：输出静态快照
  const serverNow = new Date().toISOString();

  return (
    <div className="space-y-6">
      <PageHeader
        no="01 · 实验 E"
        title="Hydration 水合"
        desc="服务端返回的 HTML 是“静态快照”（看得见、点不动）。JS 下载执行后，React 在客户端重建组件树、复用已有 DOM、附加事件与状态 —— 这一步就是水合。"
      />

      <div className="grid gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="text-xs text-slate-500">服务端渲染快照（HTML 里就存在）</p>
          <p className="mt-1 font-mono text-emerald-300">{serverNow}</p>
          <p className="mt-1 text-xs text-slate-500">
            注意：这段时间在浏览器端与客户端时钟不同步 —— 正是水合不匹配（mismatch）的常见来源。
          </p>
        </div>

        <HydrationDemo />
      </div>

      <Note title="水合发生前 vs 发生后">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            水合前：HTML 里已有文本，但按钮点击无效、<code>useState</code> 未生效。
          </li>
          <li>
            水合后：React 复用这些 DOM（不重新创建），附加事件、恢复状态 —— 页面才"活"。
          </li>
          <li>
            <code>window</code> 判断：服务端渲染阶段 <code>typeof window === "undefined"</code>，
            直接访问 <code>window</code> 会抛错（第 3 章 RSC 会深入讲这个坑）。
          </li>
        </ul>
      </Note>
    </div>
  );
}
