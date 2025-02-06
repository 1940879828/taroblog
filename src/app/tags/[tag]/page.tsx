import Paper from "@/component/Paper/Paper"
import Sidebar from "@/component/Sidebar"
import TimeLine from "@/component/TimeLine"
import { getAllTags, getNotes } from "@/lib/note"

export async function generateStaticParams() {
  const allTags = await getAllTags()
  return allTags.map((tag) => ({
    tag: encodeURIComponent(tag)
  }))
}

export default async function Tag({
  params
}: { params: Promise<{ tag: string }> }) {
  const { tag: _tag } = await params
  const tag = decodeURIComponent(_tag)
  const notes = await getNotes()
  const filterTagNotes = notes.filter((item) => item.tags.includes(tag))
  return (
    <div className="w-container !pt-8 flex gap-2">
      <Paper elevation={2} className="flex-1 p-8">
        <div className="font-bold text-xl flex mb-2">标签：{tag}</div>
        <div>{decodeURIComponent.toString()}</div>
        <div>{decodeURIComponent("%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C")}</div>
        <TimeLine list={filterTagNotes} />
      </Paper>
      <Sidebar />
    </div>
  )
}
