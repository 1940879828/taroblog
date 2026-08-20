import { NextResponse } from "next/server"

// 对比实验用的 API Route：接收 JSON，回显 + 时间戳。
// 客户端要手动 fetch 它，处理 JSON 序列化与响应。
export async function POST(request: Request) {
  const body = await request.json()
  const text = String(body?.text ?? "").trim()

  if (!text) {
    return NextResponse.json(
      { ok: false, error: "内容不能为空" },
      { status: 400 }
    )
  }

  return NextResponse.json({
    ok: true,
    text,
    receivedAt: new Date().toISOString(),
    source: "API Route（客户端 fetch 调用）"
  })
}
