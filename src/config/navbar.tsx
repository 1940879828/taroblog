import { Link as LinkIcon, Newspaper, Route } from "lucide-react"

export const navs = [
  {
    link: "/",
    icon: <Route size={16} />,
    name: "路线图"
  },
  {
    link: "/notes/1",
    icon: <Newspaper size={16} />,
    name: "笔记"
  },
  {
    link: "/friend",
    icon: <LinkIcon size={16} />,
    name: "友链"
  }
] as const
