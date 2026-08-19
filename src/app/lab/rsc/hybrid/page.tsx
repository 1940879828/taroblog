import ClientShell from "./client-shell";

// 服务端组件：只在服务端渲染，代码不进浏览器 bundle
function ServerCard({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm">
      <p className="text-xs text-sky-300">服务端组件 ServerCard</p>
      <p className="mt-2 text-slate-300">
        {label}：这段内容由服务端渲染，<strong>它的代码不会进浏览器 bundle</strong>。
      </p>
    </div>
  );
}

export default function HybridPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">混合树</h1>
      <p className="text-sm leading-6 text-slate-400">
        一个组件树里同时存在服务端组件和客户端组件。下面演示两种组合方式：
      </p>

      <ServerCard label="直接渲染" />

      <p className="text-sm text-slate-400">
        ① 服务端组件 <code>import</code> 客户端组件（把客户端组件当"岛屿"嵌入）：
      </p>
      <ClientShell />

      <p className="text-sm text-slate-400">
        ② 服务端组件作为 <code>children</code> 传给客户端组件（服务端先算好结果再塞进去）：
      </p>
      <ClientShell>
        <ServerCard label="通过 children 透传" />
      </ClientShell>

      <p className="text-xs text-slate-500">
        观察：右键"查看网页源码"，ServerCard 的内容都在 HTML 里；而客户端组件的交互（点击）需要 JS
        水合后才能用。
      </p>
    </div>
  );
}
