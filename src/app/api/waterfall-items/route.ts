import { NextResponse } from "next/server"

const PAGE_SIZE = 8
// 总共 30 条数据，模拟一个需要分页加载的列表
const TOTAL = 30

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") ?? "1")

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const items = Array.from({ length: TOTAL }, (_, i) => {
    const id = i + 1
    return {
      id,
      title: `卡片 ${id}`,
      height: 120 + ((id * 37) % 160),
    }
  }).slice(start, end)

  return NextResponse.json({
    page,
    pageSize: PAGE_SIZE,
    total: TOTAL,
    hasMore: end < TOTAL,
    items,
  })
}
