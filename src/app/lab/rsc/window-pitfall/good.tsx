"use client";

import { useEffect, useState } from "react";

// 正面例子：在 useEffect 里读 window（只在浏览器执行），服务端渲染时用兜底值。
export default function GoodRead() {
  const [width, setWidth] = useState("加载中…");

  useEffect(() => {
    setWidth(String(window.innerWidth));
  }, []);

  return (
    <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
      <p className="text-xs text-emerald-300">✅ useEffect 里读 window（正确）</p>
      <p className="mt-2 text-slate-300">window.innerWidth = {width}</p>
      <p className="mt-2 text-xs text-slate-500">
        服务端先渲染"加载中…"，浏览器水合后 useEffect 执行，才读出真实宽度。无 mismatch。
      </p>
    </div>
  );
}
