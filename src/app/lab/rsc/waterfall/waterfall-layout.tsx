"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// 根据屏幕宽度计算列数（只有浏览器知道 window.innerWidth）
function computeCols(width: number): number {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function WaterfallLayout({ children }: { children: ReactNode }) {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const update = () => setCols(computeCols(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
      <p className="mb-3 text-xs text-emerald-300">
        客户端布局组件（&apos;use client&apos;）—— 当前列数：{cols}
      </p>
      {/* 用 CSS columns 让浏览器自动分列，不拆分 children */}
      <div style={{ columnCount: cols, columnGap: "1rem" }}>{children}</div>
    </div>
  );
}
