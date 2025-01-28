import Paper from "@/component/Paper/Paper"
import { getAllCategoriesTree, getAllTags, getNotes } from "@/lib/note"
import { cn } from "@/lib/utils"
import {ListTree, Tag } from "lucide-react"
import Link from "next/link"

export default async function Notes() {
  const notes = await getNotes()
  const allTags = await getAllTags()
  const categoryTree = await getAllCategoriesTree()
  console.log(JSON.stringify(categoryTree, null, 2))
  return (
    <div className="w-container !pt-8 flex gap-2">
      <ul className="flex-1 flex flex-col gap-2">
        {notes.map((note, index) => (
          <Paper key={index} elevation={2} className="hover:scale-[101%] transition-transform duration-300 bg-base-100 z-10">
            <Link href={`/note/${note.fileName}`}>
              <div className="card card-md cursor-pointer">
                <div className="card-body">
                  <h2 className="card-title">{note.title}</h2>
                  <div className="flex items-center gap-4">
                    <span>2025/1/27</span>
                    <div className="flex items-center gap-1">
                      <div>📁{note.categories.join(">")}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {note.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="badge badge-primary text-xs pr-2 pl-1 h-5 cursor-pointer"
                        >
                          🏷{tag}
                        </div>
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
      <div className="flex flex-col gap-2 w-64 h-fit">
        <Paper elevation={2} className=" bg-base-100 card card-sm">
          <div className="card-body">
            <div className="text-xl flex gap-1 items-center font-bold">
              <Tag />
              标签
            </div>
            <div >
              {allTags.map((tag, index) => {
                const rainbowColors = [
                  "#FF0000", // 红
                  "#FF7F00", // 橙
                  "#FFFF00", // 黄
                  "#00FF00", // 绿
                  "#0000FF", // 蓝
                  "#4B0082", // 靛
                  "#8F00FF" // 紫
                ]

                // HEX转RGB计算亮度
                const hexToLuma = (hex: string) => {
                  const _hex = hex.replace(/^#/, "")
                  const rgb = Number.parseInt(_hex, 16)
                  const r = (rgb >> 16) & 0xff
                  const g = (rgb >> 8) & 0xff
                  const b = (rgb >> 0) & 0xff
                  return 0.2126 * r + 0.7152 * g + 0.0722 * b // 亮度计算公式
                }

                const color = rainbowColors[index % rainbowColors.length]
                const textColor = hexToLuma(color) > 128 ? "black" : "white" // 亮度阈值128

                return (
                  <div
                    key={index}
                    className="badge border-none mr-2 mt-2 text-xs pr-2 pl-1 h-6 cursor-pointer shadow-sm brightness-75 opacity-80 backdrop-blur-sm hover:scale-[110%] transition-transform duration-300"
                    style={{
                      backgroundColor: color,
                      color: textColor,
                      textShadow:
                        textColor === "white" ? "0 1px 2px rgba(0,0,0,0.5)" : "none" // 增强对比度
                    }}
                  >
                    🏷{tag}
                  </div>
                )
              })}
            </div>
          </div>
        </Paper>
        <Paper elevation={2} className=" bg-base-100 card card-sm">
          <div className="card-body">
            <div className="flex text-xl font-bold justify-between items-center">
              <div className="flex gap-1 items-center">
                <ListTree />
                分类
              </div>
              <span>
                {notes.length}
              </span>
            </div>
            <ul className="flex flex-col">
              {categoryTree.map(function recursion(category, index){
                const {name, count, children} = category
                return (
                  <li key={index}>
                    <Link href={``}className="text-base py-1 px-1 hover:bg-base-200 flex justify-between items-center hover:px-2 transition-all duration-[218ms]">
                      <span>{name}</span>
                      <span>{count}</span>
                    </Link>
                    <ul hidden={children.length===0} className="flex pl-4 flex-col">
                      {children.map(recursion)}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </div>
        </Paper>
      </div>
    </div>
  )
}
