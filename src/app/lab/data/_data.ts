// 数据缓存实验的共享"数据源"：模拟一次真实 IO（数据库查询 / 外部 API 调用）。
// 每次真正执行都返回"新"的时间戳 + 随机数，用于观察缓存命中 / 失效。
//
// 为什么不用 fetch 指向 localhost？
// 构建期预渲染会执行页面里的取数逻辑，而 build 阶段 localhost 上还没有服务，
// 会 ECONNREFUSED。改用内联 async 函数模拟 IO，构建期 / 运行期都稳定，
// 且更能聚焦"缓存机制"本身（配合 unstable_cache / revalidate / tags）。
export async function getRawData() {
  // 模拟 IO 延迟，让"是否命中缓存"的差异可感知
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    generatedAt: new Date().toISOString(),
    random: Math.random(),
  }
}
