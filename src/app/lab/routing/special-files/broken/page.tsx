export const dynamic = "force-dynamic";

export default function BrokenPage() {
  throw new Error("这个页面故意抛错，用来触发 error.tsx 兜底");
}
