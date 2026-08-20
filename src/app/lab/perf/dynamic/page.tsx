import { PageHeader } from "../../_components"
import DynamicSection from "./dynamic-section"

export default function DynamicPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="06 · 实验 C"
        title="next/dynamic 动态导入"
        desc="把不首屏需要的重量级组件拆出去，用 next/dynamic 按需加载，减少首屏 JS 体积。"
      />

      {/* ssr:false 的动态导入必须在客户端组件里，所以统一放进 DynamicSection */}
      <DynamicSection />

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <code>next/dynamic</code> 让组件变成<strong>独立 chunk</strong>
            ，不进首屏。 打开 Network 面板可看到：首屏只有核心
            bundle，点按钮才请求那个组件的 chunk。
          </li>
          <li>适用于：图表库、编辑器、地图、只在用户操作后才出现的重组件。</li>
          <li>
            与 <code>React.lazy</code> 类似，但 <code>next/dynamic</code> 还支持{" "}
            <code>ssr</code> 开关和 <code>loading</code> 占位。
          </li>
          <li>
            <strong>坑（Next 16）</strong>：<code>ssr: false</code> 只能在{" "}
            <strong>客户端组件</strong>里用，服务端组件会直接 build 报错。
          </li>
          <li>
            更强的思路：如果组件能改成<strong>服务端组件</strong>（不发
            JS），比动态导入更优（承接第 3 章）。
          </li>
        </ul>
      </div>
    </div>
  )
}
