import FadeInBottom from "@/components/AnimatedEffect/FadeInBottom"
import PageHero from "@/components/HappyPageHero"
import NoteCard from "@/components/NoteCard"
import Sidebar from "@/components/Sidebar"
import { getNotes, getNotesByPage } from "@/lib/note"
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
    <>
      <PageHero>
        <div className="text-white text-xl font-bold text-shadow">
          不积跬步，无以至千里。
        </div>
      </PageHero>
      <div className="w-container !pt-8 flex gap-2 flex-wrap">
        <ul className="flex-1 flex flex-col gap-2 pb-8">
          {notes.map((note, index) => (
            <FadeInBottom key={index} index={index}>
              <NoteCard note={note} />
            </FadeInBottom>
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
    </>
  )
}
