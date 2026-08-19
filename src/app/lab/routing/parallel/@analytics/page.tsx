export const dynamic = "force-dynamic";

export default async function AnalyticsSlot() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <div className="text-sm text-slate-300">
      <p className="font-semibold">访问量分析</p>
      <p className="mt-1 text-emerald-300">今日 UV：1,234</p>
      <p className="text-emerald-300">较昨日 +12%</p>
      <p className="mt-2 text-xs text-slate-500">（这个 slot 延迟 1.5s 才渲染，演示独立 loading）</p>
    </div>
  );
}
