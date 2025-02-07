import ButtonGroup from "@/component/NavBar/ButtonGroup"
import { Link as LinkIcon, Newspaper, Route } from "lucide-react"
import Link from "next/link"

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="w-container flex items-center">
        <div className="border-l-8 border-base-300 w-4 h-8" />
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost px-1 text-xl">
            🌳TaroBlog
          </Link>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">
                <Route size={16} />
                路线图
              </Link>
            </li>
            <li>
              <Link href="/notes/1">
                <Newspaper size={16} />
                笔记
              </Link>
            </li>
            <li>
              <Link href="/friend">
                <LinkIcon size={16} />
                友链
              </Link>
            </li>
          </ul>
        </div>
        <ButtonGroup />
      </div>
    </div>
  )
}

export default NavBar
