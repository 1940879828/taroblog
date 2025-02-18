import Paper from "@/components/Paper/Paper"
import Sidebar from "@/components/Sidebar"
import { getNotes, getNotesByPage } from "@/lib/note"
import { Folder } from "lucide-react"
import Link from "next/link"

export async function generateStaticParams() {
  const notes = await getNotes()
  return notes.map((_, index) => ({
    currentPage: String(index + 1)
  }))
}

export default async function Notes({
  params
}: { params: Promise<{ currentPage: number }> }) {
  const { currentPage } = await params
  const { data: notes, total } = await getNotesByPage({ page: currentPage })
  const totalPages = Math.ceil(total / 10)
  return (
    <div className="w-container !pt-8 flex gap-2">
      <ul className="flex-1 flex flex-col gap-2 pb-8">
        {notes.map((note, index) => (
          <Paper
            key={index}
            elevation={2}
            className="hover:scale-[101%] transition-transform duration-300 bg-base-100 z-10"
          >
            <Link href={`/note/${note.fileName}`}>
              <div className="card card-md cursor-pointer">
                <div className="card-body">
                  <h2 className="card-title">{note.title}</h2>
                  <div className="flex items-center gap-4">
                    <span>{note.date}</span>
                    <div className="flex items-center gap-1">
                      <Folder size={16} />
                      {note.categories.map((category, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Link
                            href={`/categories/${category}`}
                            key={index}
                            className="hover:link-hover"
                          >
                            {category}
                          </Link>
                          <div
                            hidden={
                              index === note.categories.length - 1 ||
                              note.categories.length === 1
                            }
                          >
                            {">"}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {note.tags.map((tag, index) => (
                        <Link
                          href={`/tags/${tag}`}
                          key={index}
                          className="badge badge-primary text-xs pr-2 pl-1 h-5 cursor-pointer hover:link-hover"
                        >
                          🏷{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {note.description && <p>{note.description}</p>}
                </div>
              </div>
            </Link>
          </Paper>
        ))}
        <div className="flex justify-center">
          <div className="join">
            {[...Array(totalPages)].map((_, index) => (
              <Link
                href={`/notes/${index + 1}`}
                key={index}
                className="join-item btn"
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
      </ul>
      <Sidebar />
    </div>
  )
}
