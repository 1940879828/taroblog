import SwrWaterfallClient from "./client";

export default function SwrWaterfallPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">SWR 版瀑布流：加载更多</h1>
      <p className="text-sm leading-6 text-slate-400">
        用 <code className="text-emerald-300">useSWRInfinite</code> 实现"滑到底加载更多"。第一页由
        <strong>服务端</strong> SSR 渲染（首屏快），后续页由<strong>客户端</strong>滚动触底时请求。
      </p>

      <SwrWaterfallClient />

      <p className="text-xs text-slate-500">
        观察：打开页面第一页（8 张卡片）已 SSR 在 HTML 里；滚动到底部会请求下一页（Network 面板能看到
        <code>/api/waterfall-items?page=2</code> 等请求），并自动追加。
      </p>
    </div>
  );
}
