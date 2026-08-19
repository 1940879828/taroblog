// 模拟服务端数据源（真实场景这里是数据库 / 内部 API）
async function fetchServerData() {
  // 模拟一个服务端专属操作：读"文件系统"（仅服务端存在 fs，客户端拿不到）
  const { promises: fs } = await import("node:fs");
  const cwd = process.cwd();
  // 用一段仅服务端能生成的数据，证明"数据在服务端算好"
  return {
    serverTime: new Date().toISOString(),
    cwd,
    hasFs: typeof fs.readFile === "function",
    secretNote: "这段数据只在服务端生成，永远不会通过 fetch 暴露给浏览器",
  };
}

export default async function ServerDataPage() {
  const data = await fetchServerData();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Server 组件取数</h1>
      <p className="text-sm leading-6 text-slate-400">
        这个页面是<strong>服务端组件</strong>（没写 <code>&apos;use client&apos;</code>
        ），直接在服务端 <code>await</code> 取数。下面的数据在服务端算好、渲染进 HTML。
      </p>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm">
        <p className="text-xs text-slate-500">服务端算好的数据（已进 HTML）：</p>
        <p className="mt-2 font-mono text-emerald-300">serverTime: {data.serverTime}</p>
        <p className="font-mono text-emerald-300">cwd: {data.cwd}</p>
        <p className="font-mono text-emerald-300">hasFs: {String(data.hasFs)}</p>
        <p className="mt-2 text-slate-400">{data.secretNote}</p>
      </div>

      <p className="text-xs text-slate-500">
        观察：右键"查看网页源码"，能看到 <code>serverTime</code> 等数据直接出现在 HTML
        里；Network 面板里没有任何额外的客户端数据请求。
      </p>
    </div>
  );
}
