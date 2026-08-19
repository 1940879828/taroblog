"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-red-500/40 bg-red-500/10 p-5">
      <h2 className="font-bold text-red-300">error.tsx —— 段级错误边界</h2>
      <p className="text-sm text-red-200/80">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg border border-red-400 px-4 py-2 text-sm text-red-200 hover:bg-red-500/20"
      >
        重试 reset()
      </button>
    </div>
  );
}
