"use client";

import { useRouter } from "next/navigation";

export default function InterceptedPhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-md rounded-xl border border-emerald-500/40 bg-slate-900 p-6">
        <p className="text-xs text-emerald-300">
          拦截层 <code>@modal/(.)photo/[id]</code>
        </p>
        <h2 className="mt-2 text-xl font-bold">照片（Modal 覆盖）</h2>
        <p className="mt-2 text-sm text-slate-400">
          这个内容是"从照片流点开"时被拦截渲染的，URL 已是
          <code className="text-emerald-300">/intercepting/photo</code>
          ，但页面没有整页跳转，而是弹窗覆盖。
        </p>
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-emerald-400 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
          >
            关闭（router.back 回照片流）
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/lab/routing/intercepting/photo/1";
            }}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-emerald-500/60"
          >
            直达整页（硬刷新绕过拦截）
          </button>
        </div>
      </div>
    </div>
  );
}
