import Image from "next/image"
import { PageHeader } from "../../_components"

export default function ImagePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="06 · 实验 A"
        title="next/image 图片优化"
        desc="next/image 是 Next 内置的图片组件，自动处理宽度/高度、懒加载、占位，避免图片成为首屏瓶颈。"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="mb-2 text-xs text-slate-400">原生 img（无优化）</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/file.svg"
            alt="普通图片"
            className="h-40 w-full object-cover"
          />
          <p className="mt-2 text-xs text-slate-500">
            直接整张加载，无尺寸/懒加载控制，可能拖慢首屏。
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <p className="mb-2 text-xs text-slate-400">next/image（优化）</p>
          <div className="h-40 w-full">
            <Image
              src="/file.svg"
              alt="优化图片"
              width={400}
              height={160}
              className="h-40 w-full object-cover"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            next/image 声明宽高可防布局抖动（CLS）、默认懒加载、可配占位。
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            给 <code>next/image</code> 明确的 <code>width</code> /{" "}
            <code>height</code>，能防止图片加载导致的
            <strong>布局偏移（CLS）</strong>。
          </li>
          <li>
            <code>loading="lazy"</code>
            （默认）：视口外的图片延迟加载，减少首屏流量。
          </li>
          <li>
            本项目 <code>next.config</code> 设了 <code>unoptimized: true</code>{" "}
            （跳过图片优化服务），所以效果是"尺寸 +
            懒加载"，真正生产环境可开启优化服务 / CDN。
          </li>
          <li>
            远程图片域名需在 <code>images.remotePatterns</code>{" "}
            登记（见本项目配置）。
          </li>
        </ul>
      </div>
    </div>
  )
}
