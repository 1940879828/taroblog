// middleware.ts （中间件）
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  // 同步主题到 header
  const theme = request.cookies.get("theme")?.value || "light"
  const headers = new Headers(request.headers)
  headers.set("x-theme", theme)

  return NextResponse.next({
    request: {
      headers
    }
  })
}
