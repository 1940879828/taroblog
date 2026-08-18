import Link from "next/link";
import { PageHeader } from "../_components";

const experiments = [
  {
    href: "/lab/rendering/csr",
    title: "CSR 客户端渲染",
    desc: "HTML 几乎为空，内容由浏览器执行 JS 后生成；数据在浏览器 fetch。",
    watch: "打开页面后看到模拟数据延迟出现；查看 Network，HTML 里没有内容、请求发生在浏览器。",
  },
  {
    href: "/lab/rendering/ssr",
    title: "SSR 服务端渲染",
    desc: "每次请求，服务器运行组件生成完整 HTML。",
    watch: "刷新页面，渲染时间每次都变。右键查看网页源码，HTML 里直接有内容。",
  },
  {
    href: "/lab/rendering/ssg",
    title: "SSG 静态生成",
    desc: "构建时生成一次 HTML，此后所有请求返回同一份。",
    watch: "pnpm build 后时间戳冻结在构建时刻；build 日志标记为 ●。",
  },
  {
    href: "/lab/rendering/isr",
    title: "ISR 增量重建",
    desc: "构建时生成 + 每 revalidate 秒后台重建一次。",
    watch: "pnpm build 后时间戳每 10 秒才变一次，期间请求返回旧版本。",
  },
  {
    href: "/lab/rendering/hydration",
    title: "Hydration 水合",
    desc: "服务端 HTML 是静态快照，JS 执行后才恢复交互。",
    watch: "按钮点击、窗口判断、水合标记。",
  },
];

export default function RenderingHome() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="CHAPTER 01"
        title="渲染模型"
        desc="SSR / CSR / SSG / ISR 区别与选型判断、水合 Hydration。核心问题：HTML 和 JS 在什么时间、什么地点被生成。"
      />

      <div className="grid gap-4">
        {experiments.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="block rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:border-emerald-500/60"
          >
            <h2 className="font-semibold text-emerald-300">{e.title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-300">{e.desc}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              <span className="text-slate-400">看什么：</span>
              {e.watch}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
