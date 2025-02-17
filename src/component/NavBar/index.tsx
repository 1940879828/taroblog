import Button from "@/component/Button"
import ButtonGroup from "@/component/NavBar/ButtonGroup"
import Search from "@/component/Search/Search"
import { AlignLeft, Link as LinkIcon, Newspaper, Route } from "lucide-react"
import Link from "next/link"

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="w-container flex items-center justify-between">
        <div className="flex-1 items-center hidden lg:flex">
          <div className="border-l-8 border-base-300 w-4 h-8" />
          <Link href="/" className="btn btn-ghost px-1 text-xl">
            🌳TaroBlog
          </Link>
          <ul className="menu menu-horizontal px-1 flex-nowrap">
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
        <div className="flex gap-2">
          <Button variant={"ghost"} className="block lg:hidden">
            <AlignLeft />
          </Button>
          <Search />
        </div>
        <ButtonGroup />
      </div>
    </div>
  )
}

export default NavBar
