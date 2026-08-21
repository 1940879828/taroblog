import Link from "next/link"
import type { ReactNode } from "react"

export const metadata = {
  title: "NextLab · Next.js 面试实验区",
  description: "以 Next 核心机制为主线的最小可运行实验"
}

const navItems = [
  { href: "/lab", label: "首页" },
  { href: "/lab/rendering", label: "01 渲染模型" },
  { href: "/lab/routing", label: "02 路由" },
  { href: "/lab/rsc", label: "03 RSC" },
  { href: "/lab/data", label: "04 缓存" },
  { href: "/lab/actions", label: "05 Server Actions" },
  { href: "/lab/perf", label: "06 性能" },
  { href: "/lab/auth", label: "07 登录状态" }
]

export default function LabLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1720px] flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3">
          <Link
            href="/lab"
            className="font-mono text-sm font-bold tracking-tight text-emerald-400"
          >
            NextLab
          </Link>
          <nav className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1720px] px-6 py-10">{children}</main>
    </div>
  )
}
