"use client";

import { useEffect, useState } from "react";

type FakeData = {
  ts: string;
  note: string;
};

export function ClientData() {
  const [data, setData] = useState<FakeData | null>(null);

  useEffect(() => {
    // 只有浏览器执行到这里，数据请求才发生 —— 这就是"客户端渲染拿数据"。
    const timer = setTimeout(() => {
      setData({
        ts: new Date().toISOString(),
        note: "数据在浏览器端 fetch 得到",
      });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <p className="text-xs text-slate-500">客户端数据区（useState + useEffect）</p>
      {data ? (
        <>
          <p className="mt-1 font-mono text-lg text-emerald-300">{data.ts}</p>
          <p className="text-xs text-slate-400">{data.note}</p>
        </>
      ) : (
        <p className="mt-2 text-sm text-amber-300">
          loading…（800ms 后出现）<br />
          此刻网页源码里这里是空的 —— 内容由浏览器现场生成。
        </p>
      )}
    </div>
  );
}
