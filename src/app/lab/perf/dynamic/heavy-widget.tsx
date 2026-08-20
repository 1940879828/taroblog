"use client"

// 模拟一个"重量级"客户端组件（真实场景：图表库、富文本编辑器、地图等大体积依赖）。
// 用 next/dynamic 懒加载它，它就不会进首屏 bundle，只在需要时才加载。
export default function HeavyWidget() {
  return (
    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
      <p className="font-semibold">重量级组件（已加载）</p>
      <p className="mt-1">
        这个组件对应真实项目里的<strong>大体积依赖</strong>
        （图表/编辑器/地图等）。 由于用 <code>next/dynamic</code> 动态导入，它
        <strong>不进入首屏 JS</strong>， 只有在点击按钮后才被加载（Network
        里能看到一个单独拆分的 JS chunk）。
      </p>
      <p className="mt-2 text-xs text-emerald-200/70">
        加载时刻：{new Date().toISOString()}
      </p>
    </div>
  )
}
