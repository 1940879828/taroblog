import WaterfallLayout from "./waterfall-layout";

// 模拟服务端数据源（真实场景是数据库 / 内部 API）
async function fetchWaterfallItems() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `卡片 ${i + 1}`,
    // 随机高度，模拟瀑布流卡片长短不一
    height: 120 + ((i * 37) % 160),
  }));
}

// 服务端组件：卡片内容在服务端渲染，零 JS 下发
function ItemCard({ item }: { item: { id: number; title: string; height: number } }) {
  return (
    <div
      className="mb-4 break-inside-avoid rounded-xl border border-slate-700 bg-slate-900 p-4"
      style={{ height: `${item.height}px` }}
    >
      <p className="font-semibold text-emerald-300">{item.title}</p>
      <p className="mt-1 text-xs text-slate-500">高度 {item.height}px · 服务端渲染</p>
    </div>
  );
}

export default async function WaterfallPage() {
  const items = await fetchWaterfallItems();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">瀑布流：服务端取数渲染 + 客户端算宽度</h1>
      <p className="text-sm leading-6 text-slate-400">
        卡片数据在<strong>服务端</strong>获取并渲染成 HTML；"按屏幕宽度算几列"在
        <strong>客户端</strong>完成。拖动浏览器窗口改变宽度，观察列数变化。
      </p>

      <WaterfallLayout>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </WaterfallLayout>

      <p className="text-xs text-slate-500">
        观察：右键"查看网页源码"，能看到所有卡片内容（标题、高度）都已渲染进 HTML；而"计算列数"
        的逻辑只在浏览器里执行（拖动窗口才会变）。
      </p>
    </div>
  );
}
