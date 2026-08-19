export default function AnalyticsLoading() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-400">
      <span className="animate-pulse">@analytics loading…（这个 slot 自己的加载态）</span>
    </div>
  );
}
