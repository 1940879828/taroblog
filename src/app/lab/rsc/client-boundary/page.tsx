import ClientCounter from "./client";

export default function ClientBoundaryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">use client 边界</h1>
      <p className="text-sm leading-6 text-slate-400">
        本页是<strong>服务端组件</strong>，它 <code>import</code> 了下面这个{" "}
        <code>&apos;use client&apos;</code> 的客户端组件。点按钮，数字会变——这是客户端状态和事件。
      </p>

      <ClientCounter />

      <p className="text-xs text-slate-500">
        观察：右键"查看网页源码"，能看到按钮的初始 HTML（<code>0</code>）也被 SSR
        出来了；但"点击后数字变化"这个行为，只有浏览器里 JS 水合后才能发生。
      </p>
    </div>
  );
}
