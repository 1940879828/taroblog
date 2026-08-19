"use client";

import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

type WaterfallItem = {
  id: number;
  title: string;
  height: number;
};

type PageResult = {
  page: number;
  hasMore: boolean;
  items: WaterfallItem[];
};

const fetcher = (url: string): Promise<PageResult> =>
  fetch(url).then((r) => r.json());

// 计算列数（只有浏览器知道 window.innerWidth）
function computeCols(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

// 生成每一页的 key（URL）
const getKey = (pageIndex: number) => `/api/waterfall-items?page=${pageIndex + 1}`;

export default function SwrWaterfallClient() {
  const [cols, setCols] = useState(1);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // useSWRInfinite：按 getKey 逐页加载
  const { data, size, setSize, isLoading } = useSWRInfinite<PageResult>(getKey, fetcher);

  // 把所有页的 items 摊平
  const items = data ? data.flatMap((page) => page.items) : [];
  const hasMore = data ? data[data.length - 1]?.hasMore : true;

  // 计算列数
  useEffect(() => {
    const update = () => setCols(computeCols(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // 用 IntersectionObserver 观察底部哨兵：进入视口即加载下一页。
  // 不依赖 window scroll（本项目滚动容器是 lab layout 的 div，不是 window）。
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSize((prev) => prev + 1);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, setSize]);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
      <p className="mb-3 text-xs text-emerald-300">
        SWR 客户端组件 —— 已加载 {items.length} 张卡片（第 {size} 页）
      </p>

      <div style={{ columnCount: cols, columnGap: "1rem" }}>
        {items.map((item) => (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid rounded-xl border border-slate-700 bg-slate-900 p-4"
            style={{ height: `${item.height}px` }}
          >
            <p className="font-semibold text-emerald-300">{item.title}</p>
            <p className="mt-1 text-xs text-slate-500">高度 {item.height}px</p>
          </div>
        ))}
      </div>

      {/* 底部哨兵：IntersectionObserver 观察它，进入视口即加载下一页 */}
      <div ref={sentinelRef} className="h-1" />

      <p className="mt-2 text-center text-xs text-slate-500">
        {isLoading
          ? "加载中…"
          : hasMore
            ? "继续向下滚动加载更多"
            : "已全部加载完"}
      </p>
    </div>
  );
}
