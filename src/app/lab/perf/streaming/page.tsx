import { Suspense } from "react"
import { PageHeader } from "../../_components"
import SlowSection from "./slow-section"

// 关键：流式渲染要求页面是"动态的"（ƒ）。
// 如果页面是静态预渲染（○），构建时 await 已经执行完，用户看到的是"算好的完整页"，没有流式效果。
// force-dynamic 让每次请求都重新渲染，Suspense 边界才能逐个流式下发。
export const dynamic = "force-dynamic"

// 骨架屏 fallback：在慢内容就绪前先展示
function Skeleton() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="h-4 w-32 animate-pulse rounded bg-slate-700" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-800" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-800" />
    </div>
  )
}

export default function StreamingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="06 · 实验 B"
        title="流式渲染 Streaming"
        desc="用 Suspense 把慢速区块包起来：页面先流式吐出不依赖慢数据的部分，慢内容就绪后再填充。"
      />

      {/* 不慢的部分：立即渲染 */}
      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">立即渲染（不等待慢数据）</p>
        <p className="mt-1">
          这部分没有 await，会<strong>第一时间</strong>
          出现在页面上。下面两个区块分别延迟 1s / 2s， 但它们
          <strong>不会阻塞本区块</strong>。
        </p>
      </div>

      {/* 慢区块 1：Suspense 包住，先显示骨架，1s 后填充 */}
      <Suspense fallback={<Skeleton />}>
        <SlowSection delayMs={1000} />
      </Suspense>

      {/* 慢区块 2：Suspense 包住，先显示骨架，2s 后填充 */}
      <Suspense fallback={<Skeleton />}>
        <SlowSection delayMs={2000} />
      </Suspense>

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <strong>流式渲染 = 不用等整页算完再返回</strong>。每个{" "}
            <code>Suspense</code>{" "}
            边界是"流式填充的节点"，慢区块就绪后逐块下发给浏览器。
          </li>
          <li>
            好处：首屏 TTFB
            更快（不用等最慢的那块）、用户先看到骨架/已有内容、感知更快。
          </li>
          <li>
            <code>loading.tsx</code> 本质上就是"整个页面默认包了一层
            Suspense"（第 2 章约定文件）。
          </li>
          <li>
            观察方式：Network
            面板把网速调慢，能看到页面先出内容、骨架、再陆续填充。
          </li>
        </ul>
      </div>
    </div>
  )
}
