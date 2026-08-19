export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">动态段 /blog/[slug]</h1>
      <p className="text-sm text-slate-400">
        对应文件 <code>app/lab/routing/basics/blog/[slug]/page.tsx</code>。
      </p>
      <p className="text-sm text-slate-300">
        当前 <code className="text-emerald-300">slug</code> 的取值是：
        <span className="ml-2 font-mono text-lg text-emerald-300">{slug}</span>
      </p>
    </div>
  );
}
