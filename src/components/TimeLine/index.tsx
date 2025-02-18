import type { Note } from "@/lib/note"
import Link from "next/link"

const TimeLine = ({ list }: { list: Note[] }) => {
  return (
    <ul className="timeline timeline-vertical items-start">
      {list.map((note, index) => (
        <li key={index} style={{ gridTemplateColumns: "none" }}>
          <hr hidden={index === 0} />
          <div className="timeline-middle" hidden={list.length === 1}>
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
          <hr hidden={index === list.length - 1} />
        </li>
      ))}
    </ul>
  )
}

export default TimeLine
