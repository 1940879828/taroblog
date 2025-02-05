import ButtonGroup from "@/component/NavBar/ButtonGroup"
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
              <Link href="/">路线图</Link>
            </li>
            <li>
              <Link href="/notes/1">笔记</Link>
            </li>
          </ul>
        </div>
        <ButtonGroup />
      </div>
    </div>
  )
}

export default NavBar
