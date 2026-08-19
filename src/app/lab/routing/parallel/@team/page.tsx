export default function TeamSlot() {
  return (
    <div className="text-sm text-slate-300">
      <p className="font-semibold">团队成员</p>
      <p className="mt-1 text-sky-300">Alice、Bob、Carol</p>
      <p className="mt-2 text-xs text-slate-500">（这个 slot 立即渲染，不等 analytics）</p>
    </div>
  );
}
