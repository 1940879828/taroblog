import GoodRead from "./good";
import BadRead from "./bad";

export default function WindowPitfallPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">window 坑</h1>
      <p className="text-sm leading-6 text-slate-400">
        服务端组件在 Node 环境执行，<strong>没有</strong>{" "}
        <code>window</code>。如果在服务端组件里直接写{" "}
        <code>window.innerWidth</code>，会在构建/服务端渲染时直接抛{" "}
        <code>ReferenceError: window is not defined</code>，导致 build 失败。
      </p>

      <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm">
        <p className="text-xs text-red-300">❌ 错误写法（服务端组件里直接读 window）：</p>
        <pre className="mt-2 overflow-x-auto font-mono text-xs text-red-200">
          {`// 服务端组件（默认）\nexport default function Page() {\n  return <div>{window.innerWidth}</div> // 构建期就报错\n}`}
        </pre>
      </div>

      <p className="text-sm text-slate-400">
        正确做法：把读 <code>window</code> 的逻辑放进客户端组件，用{" "}
        <code>useEffect</code> 包住（只在浏览器执行）。下面两个客户端组件对比：
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <BadRead />
        <GoodRead />
      </div>
    </div>
  );
}
