export default async function DynamicSegmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">动态段 /segments/[slug]</h1>
      <p className="text-sm text-slate-400">
        匹配单个段。当前值：<span className="font-mono text-emerald-300">{slug}</span>
      </p>
    </div>
  );
}
