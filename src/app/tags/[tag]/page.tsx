import Paper from "@/component/Paper/Paper"
import Sidebar from "@/component/Sidebar"
import { getAllTags, getNotes } from "@/lib/note"
import Link from "next/link"

export async function generateStaticParams() {
  const allTags = await getAllTags()
  return allTags.map((tag) => ({
    tag: encodeURIComponent(tag)
  }))
}

export default async function NoteDetail({
  params
}: { params: { tag: string } }) {
  const { tag: _tag } = params
  const tag = decodeURIComponent(_tag)
  const notes = await getNotes()
  const filterTagNotes = notes.filter((item) => item.tags.includes(tag))
  return (
    <div className="w-container !pt-8 flex gap-2">
      <Paper elevation={2} className="flex-1 p-8">
        <div className="font-bold text-xl flex mb-2">标签：{tag}</div>
        <ul className="timeline timeline-vertical items-start">
          {filterTagNotes.map((note, index) => (
            <li key={index} style={{ gridTemplateColumns: "none" }}>
              <hr hidden={index === 0} />
              <div
                className="timeline-middle"
                hidden={filterTagNotes.length === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Link
                key={index}
                href={`/note/${note.fileName}`}
                className="timeline-end timeline-box"
              >
                <div className="text-lg">{note.title}</div>
                <div className="text-md">{note.date}</div>
              </Link>
              <hr hidden={index === filterTagNotes.length - 1} />
            </li>
          ))}
        </ul>
      </Paper>
      <Sidebar />
    </div>
  )
}
