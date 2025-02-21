import Paper from "@/components/Paper/Paper"
import TagGroup from "@/components/TagGroup"
import { getAllCategoriesTree, getAllTags, getNotesCount } from "@/lib/note"
import { ListTree, Tag } from "lucide-react"
import Link from "next/link"

const Sidebar = async () => {
  const notesCount = await getNotesCount()
  const _allTags = await getAllTags()
  const categoryTree = await getAllCategoriesTree()

  return (
    <div className="flex flex-col gap-2 w-full md:w-64 h-fit pb-20 md:pb-0">
      <Paper elevation={2} className=" bg-base-100 card card-sm">
        <div className="card-body">
          <div className="flex text-xl font-bold justify-between items-center">
            <div className="flex gap-1 items-center">
              <ListTree />
              分类
            </div>
            <span>{notesCount}</span>
          </div>
          <ul className="flex flex-col">
            {categoryTree.map(function recursion(category, index) {
              const { name, count, children } = category
              return (
                <li key={index}>
                  <Link
                    href={`/categories/${name}`}
                    className="text-base py-1 px-1 hover:bg-base-200 flex justify-between items-center hover:px-2 transition-all duration-[218ms]"
                  >
                    <span>{name}</span>
                    <span>{count}</span>
                  </Link>
                  <ul
                    hidden={children.length === 0}
                    className="flex pl-4 flex-col"
                  >
                    {children.map(recursion)}
                  </ul>
                </li>
              )
            })}
          </ul>
        </div>
      </Paper>
      <Paper elevation={2} className=" bg-base-100 card card-sm">
        <div className="card-body">
          <div className="text-xl flex gap-1 items-center font-bold">
            <Tag />
            标签
          </div>
          <TagGroup />
        </div>
      </Paper>
    </div>
  )
}

export default Sidebar
