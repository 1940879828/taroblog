export default function ParallelMainPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">并行路由 Parallel Routes</h1>
      <p className="text-sm leading-6 text-slate-400">
        一个页面由多个 <code>@slot</code> 并行渲染到同一个 layout。下面两个面板（
        <code className="text-emerald-300">@analytics</code>、<code className="text-sky-300">@team</code>
        ）就是两个独立的 slot，各自渲染、互不阻塞。
      </p>
      <p className="text-xs text-slate-500">
        观察：<code>@analytics</code> 因为 await 了 1.5 秒，会先显示它自己的 loading，而
        <code>@team</code> 和主内容不受影响、立即显示 —— 这就是"并行路由互不阻塞"。
      </p>
    </div>
  );
}
