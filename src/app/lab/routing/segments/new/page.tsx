export default function NewStaticPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">静态段 /segments/new</h1>
      <p className="text-sm text-slate-400">
        这是写死的静态段 <code>new/page.tsx</code>。虽然 <code>[slug]</code> 也能匹配
        <code>/segments/new</code>，但静态段优先级更高，最终命中的是这里。
      </p>
    </div>
  );
}
