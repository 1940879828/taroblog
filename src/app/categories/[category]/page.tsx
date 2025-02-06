import Paper from "@/component/Paper/Paper"
import Sidebar from "@/component/Sidebar"
import TimeLine from "@/component/TimeLine"
import { getAllCategories, getNotes } from "@/lib/note"

export async function generateStaticParams() {
  const allCategory = await getAllCategories()
  return allCategory.map((tag) => ({
    category: encodeURIComponent(tag)
  }))
}

export default async function Category({
  params
}: { params: Promise<{ category: string }> }) {
  const { category: _category } = await params
  const category = decodeURIComponent(_category)
  const notes = await getNotes()
  const filterTagNotes = notes.filter((item) =>
    item.categories.includes(category)
  )
  return (
    <div className="w-container !pt-8 flex gap-2">
      <Paper elevation={2} className="flex-1 p-8">
        <div className="font-bold text-xl flex mb-2">分类：{category}</div>
        <TimeLine list={filterTagNotes} />
      </Paper>
      <Sidebar />
    </div>
  )
}
