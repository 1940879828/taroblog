export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">捕获段 /segments/docs/[...slug]</h1>
      <p className="text-sm text-slate-400">
        匹配任意多层。当前捕获的段数组：
      </p>
      <p className="font-mono text-lg text-emerald-300">[{slug.join(", ")}]</p>
    </div>
  );
}
