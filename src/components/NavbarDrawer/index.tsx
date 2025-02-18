import { navs } from "@/config/navbar"
import { AlignLeft } from "lucide-react"
import Link from "next/link"
import DrawerLinkButtonGroup from "./DrawerLinkButtonGroup"

const NavbarDrawer = () => {
  return (
    <div className="drawer w-auto">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost flex lg:hidden items-center justify-center w-12 p-0 input input-bordered cursor-pointer"
        >
          <AlignLeft />
        </label>
      </div>
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu gap-4 bg-base-200 text-base-content min-h-full w-80 p-4">
          {navs.map((nav) => (
            <li key={nav.name}>
              <Link href={nav.link} key={nav.link} className="py-4">
                {nav.icon}
                {nav.name}
              </Link>
            </li>
          ))}
          <DrawerLinkButtonGroup />
        </ul>
      </div>
    </div>
  )
}

export default NavbarDrawer
