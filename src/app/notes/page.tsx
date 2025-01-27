import {getAllTags, getNotes} from "@/lib/note"
import Link from "next/link"
import Paper from "@/component/Paper/Paper";
import {Tag} from "lucide-react";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";

export default async function Notes() {
  const notes = await getNotes()
  const allTags = await getAllTags()
  const savedTheme = (await cookies()).get('theme')

  return (
    <div className="w-container !pt-8 flex gap-2">
      <ul className="flex-1 flex flex-col gap-2">
        {notes.map((note, index) => (
          <Paper key={index} elevation={2}>
            <Link href={`/note/${note.fileName}`}>
              <div
                className="card bg-base-100 card-md cursor-pointer"
                title={note.content}
              >
                <div className="card-body">
                  <h2 className="card-title">{note.title}</h2>
                  <div className="flex items-center gap-4">
                  <span>
                    2025/1/27
                  </span>
                    <div className="flex items-center gap-1">
                      <div>📁{note.categories.join(">")}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {note.tags.map((tag, index) => (
                        <div key={index} className="badge badge-primary text-xs pr-2 pl-1 h-5 cursor-pointer">🏷{tag}</div>
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
      <Paper elevation={2} className="w-64 p-2 h-fit ">
        <div className="text-xl flex gap-1 mb-4 items-center font-bold"><Tag/>标签</div>
        <div className="space-y-2 space-x-2">
          {
            allTags.map((tag, index) => {
              console.log({tag})
              const rainbowColors = [
                '#FF0000', // 红
                '#FF7F00', // 橙
                '#FFFF00', // 黄
                '#00FF00', // 绿
                '#0000FF', // 蓝
                '#4B0082', // 靛
                '#8F00FF'  // 紫
              ]

              // HEX转RGB计算亮度
              const hexToLuma = (hex:string) => {
                hex = hex.replace(/^#/, '')
                const rgb = parseInt(hex, 16)
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
                  className={cn("badge text-xs pr-2 pl-1 h-6 cursor-pointer transition-colors shadow-sm brightness-75 opacity-80 backdrop-blur-sm")}
                  style={{
                    backgroundColor: color,
                    color: textColor,
                    textShadow: textColor === "white" ? "0 1px 2px rgba(0,0,0,0.5)" : "none" // 增强对比度
                  }}
                >
                  🏷{tag}
                </div>
              )
            })
          }
        </div>
      </Paper>
    </div>
  )
}
