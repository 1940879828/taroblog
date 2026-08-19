import Link from "next/link";

export default async function PhotoFullPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <p className="text-xs text-emerald-300">
        整页层 <code>photo/[id]</code>
      </p>
      <h1 className="text-xl font-bold">照片 {id}（整页）</h1>
      <p className="text-sm text-slate-400">
        这是<span className="text-emerald-300">直接访问 / 刷新</span>
        该 URL 时渲染的整页，没有被 Modal 拦截。
      </p>
      <Link
        href="/lab/routing/intercepting"
        className="inline-block rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-emerald-500/60"
      >
        返回照片流
      </Link>
    </div>
  );
}
