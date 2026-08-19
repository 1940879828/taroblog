import ClientDropdown from "./client-dropdown";

// 服务端组件：下拉菜单里要显示的"内容"。
// 这段内容由服务端渲染（比如查数据库、读文件算出来的列表），
// 它的代码和数据只会进 HTML，不会进浏览器 bundle。
async function fetchMenuItems() {
  // 模拟服务端算出来的数据（真实场景是查库 / 读文件）
  await new Promise((resolve) => setTimeout(resolve, 50));
  return ["服务端菜单项 A", "服务端菜单项 B", "服务端菜单项 C"];
}

function ServerMenuItem({ item }: { item: string }) {
  return <li className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">{item}</li>;
}

export default async function DaisyuiDropdownPage() {
  const items = await fetchMenuItems();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">手写下拉：哪些部分发 JS，哪些不发</h1>
      <p className="text-sm leading-6 text-slate-400">
        这个下拉由两部分组成。点按钮试试，然后看下面的拆解：
      </p>

      <ClientDropdown>
        {/* 服务端组件作为 children 传进客户端外壳：只发结果，不发代码 */}
        <ul className="py-1">
          {items.map((item) => (
            <ServerMenuItem key={item} item={item} />
          ))}
        </ul>
      </ClientDropdown>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
          <p className="text-xs text-emerald-300">✅ 客户端外壳（唯一发 JS 的部分）</p>
          <p className="mt-2 text-slate-300">
            只有 <code>useState</code> 开关 + 按钮的 <code>onClick</code>。这是交互，必须发
            JS。但它是<span className="font-semibold">极小</span>的几行。
          </p>
          <p className="mt-1 text-xs text-slate-500">
            文件：<code>client-dropdown.tsx</code>（带 &apos;use client&apos;）
          </p>
        </div>
        <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm">
          <p className="text-xs text-sky-300">✅ 服务端内容（不发 JS 的部分）</p>
          <p className="mt-2 text-slate-300">
            菜单里的 3 个项是服务端组件 <code>ServerMenuItem</code> 渲染的，数据由{" "}
            <code>fetchMenuItems()</code> 在服务端算好。它们的代码和逻辑
            <span className="font-semibold">不会进浏览器 bundle</span>。
          </p>
          <p className="mt-1 text-xs text-slate-500">
            文件：本页 <code>page.tsx</code>（服务端组件）
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        对比 Ant Design：它的 <code>&lt;Dropdown&gt;</code> 会把"外壳 + 内容 + 一堆细节逻辑"整体打成客户端
        JS 发下去。而这里，只有外壳那几行发 JS，内容部分不发。
      </p>
    </div>
  );
}
