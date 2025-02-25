import HappyNavBg from "@/components/HappyNavBg"
import LinkButtonGroup from "@/components/NavBar/LinkButtonGroup"
import NavbarDrawer from "@/components/NavbarDrawer"
import Search from "@/components/Search/Search"
import { navs } from "@/config/navbar"
import Link from "next/link"
import type React from "react"
import FadeInTop from "../AnimatedEffect/FadeInTop"

const NavBar = () => {
  return (
    <div className="relative navbar bg-base-100">
      <HappyNavBg />
      <div className="w-container flex items-center justify-start md:justify-between">
        <FadeInTop>
          <div className="flex-1 items-center hidden lg:flex">
            <div className="border-l-8 border-base-300 w-4 h-8" />
            <Link href="/" className="btn btn-ghost px-1 text-xl">
              🌳TaroBlog
            </Link>
            <ul className="menu menu-horizontal px-1 flex-nowrap">
              {navs.map((nav) => (
                <li key={nav.name}>
                  <Link href={nav.link} key={nav.link}>
                    {nav.icon}
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeInTop>
        <div className="flex gap-4">
          <NavbarDrawer />
          <FadeInTop>
            <Search />
          </FadeInTop>
        </div>
        <FadeInTop>
          <LinkButtonGroup />
        </FadeInTop>
      </div>
    </div>
  )
}

export default NavBar
