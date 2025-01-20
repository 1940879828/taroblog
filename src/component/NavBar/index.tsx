import ThemeChanger from "@/component/ThemeChanger"
import Link from "next/link"

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          TaroBlog
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
  )
}

export default NavBar
