import Link from "next/link";

const chapters = [
  {
    href: "/lab/rendering",
    no: "01",
    title: "渲染模型",
    desc: "SSR / CSR / SSG / ISR 区别与选型、水合 Hydration",
    items: ["csr · 客户端渲染", "ssr · 服务端渲染", "ssg · 静态生成", "isr · 增量重建", "hydration · 水合"],
  },
  {
    href: "/lab/routing",
    no: "02",
    title: "App Router 路由",
    desc: "文件系统路由、动态/捕获段、layout 状态保留、并行/拦截路由",
    items: [],
    coming: true,
  },
  {
    href: "/lab/rsc",
    no: "03",
    title: "React Server Components",
    desc: "'use client' 边界、Server 组件限制、window 坑",
    items: [],
    coming: true,
  },
  {
    href: "/lab/data",
    no: "04",
    title: "数据获取与缓存",
    desc: "fetch 缓存、四层缓存、revalidate、静态 vs 动态",
    items: [],
    coming: true,
  },
  {
    href: "/lab/actions",
    no: "05",
    title: "Server Actions",
    desc: "'use server' 原理、渐进增强",
    items: [],
    coming: true,
  },
  {
    href: "/lab/perf",
    no: "06",
    title: "性能 / 部署 / 工程化",
    desc: "next/image、流式渲染、next build",
    items: [],
    coming: true,
  },
];

export default function LabHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-2xl font-bold text-emerald-400">/lab</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Next.js 面试学习的可运行实验区。每章对应一组最小实验，用于验证笔记里的机制。
          注意：开发模式（<code className="text-slate-200">pnpm dev</code>）下所有页面每次请求都重新渲染，
          观察静态/动态差异请用 <code className="text-slate-200">pnpm build && pnpm start</code>，
          build 日志的 <code className="text-slate-200">●</code>（静态）/ <code className="text-slate-200">ƒ</code>（动态）是最直观证据。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {chapters.map((c) => (
          <Link
            key={c.no}
            href={c.href}
            className={`group rounded-xl border p-5 transition ${
              c.coming
                ? "border-slate-800 bg-slate-900/40 opacity-60"
                : "border-slate-700 bg-slate-900 hover:border-emerald-500/60"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm text-emerald-400">{c.no}</span>
              {c.coming && <span className="text-xs text-slate-500">待建</span>}
            </div>
            <h2 className="mt-2 font-semibold">{c.title}</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">{c.desc}</p>
            {c.items.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-400">
                {c.items.map((i) => (
                  <li key={i} className="rounded bg-slate-800 px-2 py-0.5">
                    {i}
                  </li>
                ))}
              </ul>
            )}
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm leading-6 text-amber-200">
        <p className="font-semibold">根 layout 的干扰提示（已实测）</p>
        <p className="mt-1 text-amber-200/80">
          根 <code>src/app/layout.tsx</code> 使用 <code>cookies()</code>（动态 API）会把多数子页面拖成动态，
          但 <code>force-static</code> 可以覆盖（ssg 页实测为静态）；仅写 <code>revalidate</code> 的 isr 页会被拖成动态。
          要观察"干净"的 ISR：临时注释根 layout 的 cookies 代码 → <code>pnpm build</code> → 看完还原。
        </p>
      </div>
    </div>
  );
}
