import ThemeChanger from "@/component/ThemeChanger"
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
              <Link href="/notes">笔记</Link>
            </li>
            <li>
              <Link href="/about">关于</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <ThemeChanger />
        </div>
      </div>
    </div>
  )
}

export default NavBar
