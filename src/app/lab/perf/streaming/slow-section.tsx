import { setTimeout as sleep } from "node:timers/promises"

// 模拟一个"慢数据源"的组件：真实场景这里是耗时数据库查询 / 外部接口。
// 它被 Suspense 包住后，会"边等边流式渲染"——不阻塞整页。
export default async function SlowSection({ delayMs }: { delayMs: number }) {
  await sleep(delayMs)

  return (
    <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm leading-6 text-sky-100">
      <p className="font-semibold text-sky-200">慢速区块（延迟 {delayMs}ms）</p>
      <p className="mt-1">
        我是 <code>await</code> 了 {delayMs}ms 才渲染出来的内容。由于被{" "}
        <code>Suspense</code> 包住，页面其它部分<strong>不需要等我</strong>
        ，先展示、我后出现。
      </p>
      <p className="mt-2 text-xs text-sky-100/70">
        渲染时刻：{new Date().toISOString()}
      </p>
    </div>
  )
}
