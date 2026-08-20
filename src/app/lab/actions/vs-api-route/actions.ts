"use server"

// 与 /api/echo 相同功能的 Server Action 版本。
// 对比要点：这里没有 route.ts、没有 JSON 序列化、没有手动处理响应。
export async function echoText(text: string) {
  const trimmed = text.trim()

  if (!trimmed) {
    return { ok: false, error: "内容不能为空" }
  }

  return {
    ok: true,
    text: trimmed,
    receivedAt: new Date().toISOString(),
    source: "Server Action（直接调用）"
  }
}
