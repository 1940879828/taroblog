"use server"

import { revalidateTag } from "next/cache"

// 按标签清掉数据缓存：凡是用 tags: ["lab-data-tag"] 缓存的数据都会被重新验证
// Next 16 起 revalidateTag 需要第二个参数 profile（缓存生命周期档位）
export async function revalidateLabData() {
  revalidateTag("lab-data-tag", "default")
}
