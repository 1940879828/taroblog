import { Note, PageHeader } from "../../_components"

// build 产物标记说明 + 本项目实测结果
const marks = [
  {
    mark: "○",
    name: "Static",
    desc: "静态预渲染（构建时渲染一次，直接返回 HTML）"
  },
  { mark: "●", name: "SSG", desc: "用 generateStaticParams 生成的静态 HTML" },
  { mark: "ƒ", name: "Dynamic", desc: "按需服务端渲染（每次请求渲染）" }
]

// 本项目（Next 16）build 日志里的真实标记样例
const samples = [
  { path: "/lab/data/fetch-cache", mark: "○" },
  { path: "/lab/data/fetch-default", mark: "ƒ" },
  { path: "/lab/rendering/isr", mark: "○ · 10s" },
  { path: "/notes/1", mark: "●" },
  { path: "/api/tags", mark: "ƒ" }
]

export default function BuildPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="06 · 实验 D"
        title="读 next build 产物"
        desc="pnpm build 后，日志会打印每个路由的渲染标记，.next 目录里能看到产物。学会读它们，才能定位「为什么这个页面是静态/动态」「哪里 JS 大」。"
      />

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="mb-3 text-xs text-slate-400">build 日志标记含义</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {marks.map((m) => (
            <div
              key={m.mark}
              className="rounded-lg border border-slate-700 bg-slate-950 p-3"
            >
              <p className="font-mono text-lg text-emerald-300">{m.mark}</p>
              <p className="text-xs font-semibold text-slate-300">{m.name}</p>
              <p className="mt-1 text-xs text-slate-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="mb-3 text-xs text-slate-400">本项目（Next 16）实测样例</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {samples.map((s) => (
            <div
              key={s.path}
              className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            >
              <span className="font-mono text-xs text-slate-400">{s.path}</span>
              <span className="font-mono text-emerald-300">{s.mark}</span>
            </div>
          ))}
        </div>
      </div>

      <Note title="怎么用 build 产物做性能定位">
        <ul className="list-disc space-y-1 pl-4">
          <li>
            想看某页是不是静态：<code>pnpm build</code> 后在日志找它的标记，
            <code>○</code> /<code>●</code> 是静态、<code>ƒ</code> 是动态。
          </li>
          <li>
            静态页产物在 <code>.next/server/app/...</code> 下的{" "}
            <code>.html</code>； 动态页每次请求才渲染。
          </li>
          <li>
            想找 JS 体积：生产构建后看 <code>.next/static/chunks/*.js</code>
            ，或跑 bundle 分析插件定位大依赖。
          </li>
          <li>
            判断"为什么变动态"：回看第 1 章 1.6（动态 API / fetch 不缓存 /
            force-dynamic）和第 4 章（缓存失效）。
          </li>
        </ul>
      </Note>
    </div>
  )
}
