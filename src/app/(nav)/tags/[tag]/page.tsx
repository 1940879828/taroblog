import Paper from "@/components/Paper/Paper"
import Sidebar from "@/components/Sidebar"
import TimeLine from "@/components/TimeLine"
import { getAllTags, getNotes } from "@/lib/note"

export async function generateStaticParams() {
  const allTags = await getAllTags()
  return allTags.map((tag) => ({
    tag: tag
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
    <div className="w-container !pt-8 flex gap-2 flex-wrap">
      <Paper elevation={2} className="flex-1 p-8">
        <div className="font-bold text-xl flex mb-2">标签：{tag}</div>
        <TimeLine list={filterTagNotes} />
      </Paper>
      <Sidebar />
    </div>
  )
}
