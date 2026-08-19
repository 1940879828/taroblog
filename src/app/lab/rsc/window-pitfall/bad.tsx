"use client";

// 反面例子：在渲染期直接读 window（而不是 useEffect 里），
// 会导致服务端 SSR 读到 undefined、客户端水合读到真实值 → hydration mismatch。
export default function BadRead() {
  const width = typeof window !== "undefined" ? window.innerWidth : "undefined";
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm">
      <p className="text-xs text-red-300">⚠️ 渲染期读 window（会 mismatch）</p>
      <p className="mt-2 text-slate-300">window.innerWidth = {width}</p>
      <p className="mt-2 text-xs text-slate-500">
        打开浏览器 Console，会看到 hydration 警告：服务端渲染的
        <code>undefined</code> 和客户端渲染的真实值不一致。
      </p>
    </div>
  );
}
