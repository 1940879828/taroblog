export const dynamic = "force-dynamic";

export default async function SlowPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">慢页面 /slow</h1>
      <p className="text-sm text-slate-400">
        这个页面 await 了 2 秒才渲染。导航进来时会先看到 loading.tsx，2 秒后才显示这里。
      </p>
    </div>
  );
}
