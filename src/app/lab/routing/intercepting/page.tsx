import Link from "next/link";

const photos = [
  { id: "1", title: "照片 1" },
  { id: "2", title: "照片 2" },
  { id: "3", title: "照片 3" },
];

export default function InterceptingFeed() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">拦截路由 Intercepting Routes</h1>
      <p className="text-sm leading-6 text-slate-400">
        同一个 URL <code className="text-emerald-300">/intercepting/photo/[id]</code>
        ，取决于"你从哪来"渲染不同组件：
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-400">
        <li>
          从下面<span className="text-emerald-300">照片流点开</span> → 被拦截，用 Modal
          覆盖在当前页上（URL 变了，但页面没整页跳转）。
        </li>
        <li>
          直接访问 / 刷新该 URL → 走整页 <code>photo/[id]/page.tsx</code>。
        </li>
      </ul>

      <div className="grid gap-3 sm:grid-cols-3">
        {photos.map((p) => (
          <Link
            key={p.id}
            href={`/lab/routing/intercepting/photo/${p.id}`}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-center transition hover:border-emerald-500/60"
          >
            <p className="font-semibold text-emerald-300">{p.title}</p>
            <p className="mt-1 text-xs text-slate-500">点我 → Modal 覆盖</p>
          </Link>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        提示：点开后注意地址栏 URL 变了，但当前页内容还在，只是被弹窗盖住；按浏览器返回键可关闭弹窗回到照片流。
      </p>
    </div>
  );
}
