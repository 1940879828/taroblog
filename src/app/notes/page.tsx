import Paper from "@/component/Paper/Paper"
import Sidebar from "@/component/Sidebar"
import { getNotes } from "@/lib/note"
import Link from "next/link"

export default async function Notes() {
  const notes = await getNotes()

  return (
    <div className="w-container !pt-8 flex gap-2">
      <ul className="flex-1 flex flex-col gap-2">
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
                  <p>
                    A card component has a figure, a body part, and inside body
                    there are title and actions parts
                  </p>
                </div>
              </div>
            </Link>
          </Paper>
        ))}
      </ul>
      <Sidebar />
    </div>
  )
}
