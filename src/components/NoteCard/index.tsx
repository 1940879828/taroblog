"use client"

import { Folder } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Note } from "@/lib/note"
import Paper from "@/components/Paper/Paper"

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const router = useRouter()

  return (
    <Paper
      elevation={2}
      className="hover:scale-[101%] transition-transform duration-300 bg-base-100 z-10"
    >
      <div
        className="card card-md cursor-pointer"
        onClick={() => {
          router.push(`/note/${note.fileName}`)
        }}
      >
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          {note.description && <p>{note.description}</p>}
          <div className="flex items-center justify-between gap-4 text-nowrap flex-wrap">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Folder size={16} />
                {note.categories.map((category, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Link
                      href={`/categories/${category}`}
                      className="hover:link-hover text-nowrap"
                      onClick={(e) => e.stopPropagation()}
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
              <div className="flex items-center gap-1 flex-wrap">
                {note.tags.map((tag, index) => (
                  <Link
                    href={`/tags/${tag}`}
                    key={index}
                    className="badge badge-primary text-xs pr-2 pl-1 h-5 cursor-pointer hover:link-hover text-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🏷{tag}
                  </Link>
                ))}
              </div>
            </div>
            <div>{note.date}</div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

