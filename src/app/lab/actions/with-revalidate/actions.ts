"use server"

import { revalidatePath } from "next/cache"

// Server Action：调用后让本页路由的数据缓存 + 完整路由缓存失效。
// 配合客户端 router.refresh()，页面重新渲染时就会重新取数（拿到新值）。
export async function refreshData() {
  // 真实场景：这里通常是"改完数据再 revalidate"，例如
  //   1. 写数据库 / 调接口更新数据
  //   2. revalidatePath("/blog") 让博客列表缓存失效
  // 本实验没有真实数据源，revalidatePath 的作用是让 unstable_cache 的缓存失效，
  // 页面下次渲染时重新执行取数（时间戳/随机数变化）。
  revalidatePath("/lab/actions/with-revalidate")
  return { refreshedAt: new Date().toISOString() }
}
