import Button from "@/component/Button"
import { getNotes } from "@/lib/note"
import Link from "next/link"

export default async function Notes() {
  const notes = await getNotes()

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, index) => (
          <div
            key={index}
            className="card w-96 bg-base-100 card-sm shadow-sm"
            title={note.content}
          >
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="justify-end card-actions">
                <Link href={`/note/${note.fileName}`}>
                  <Button variant="primary">read</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}
