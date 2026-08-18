import type { Metadata } from "next"
import "./globals.css"
import MountMessageList from "@/components/MountMessageList"
import ThemeProvider from "@/components/ThemeProvider"
import { DEFAULT_THEME, VALID_THEMES } from "@/lib/theme"
import FireWordEffect from "@/providers/fireword"
import localFont from "next/font/local"
import type React from "react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
})

export const metadata: Metadata = {
  title: "TaroBlog",
  description:
    "探索前端开发、区块链技术、Web性能优化、JavaScript、Vue、React、PHP、Laravel、MongoDB、MySQL等技术的深度解析与实践。本博客涵盖了从基础到进阶的技术内容，包括CSS、HTML、Git、WebSocket等，适合开发者提升技能与解决实际问题。",
  alternates: {
    canonical: "https://taroblog.top" // 设置 canonical URL
  },
  keywords:
    "TaroBlog, taroblog, 前端开发, JavaScript, Vue, React, PHP, Laravel, MongoDB, MySQL, CSS, HTML, Git, WebSocket, 智能合约, 性能优化, 闭包, 跨域, 计算机网络, 节流与防抖, 宏任务, 微任务, 回流与重绘, 前端性能优化, Web开发, 技术博客",
  authors: { name: "TaroBlog" },
  robots: "index, follow",
  openGraph: {
    title: "TaroBlog",
    description: "TaroBlog技术博客",
    url: "https://taroblog.top", // 页面的完整 URL
    siteName: "TaroBlog",
    images: [
      {
        url: "https://t.alcy.cc/acg", // Open Graph 图片 URL
        width: 800,
        height: 600,
        alt: "beautiful cover"
      }
    ],
    locale: "zh_CN", // 页面的语言和地区
    type: "website" // 页面类型，如 'website', 'article' 等
  }
}

// 在 React 水合前同步主题，避免用 cookies() 把博客页面拖成动态渲染。
const themeMigrationScript = `
(function () {
  try {
    var valid = ${JSON.stringify(VALID_THEMES)};
    var fallback = ${JSON.stringify(DEFAULT_THEME)};
    var match = document.cookie.match(/(?:^|; )theme=([^;]+)/);
    var cookieTheme = match ? decodeURIComponent(match[1]) : "";

    var legacyTheme = "";
    var legacyPref = "";
    try {
      legacyTheme = localStorage.getItem("theme") || "";
      legacyPref = localStorage.getItem("theme-pref") || "";
    } catch (e) {}

    var finalTheme = valid.indexOf(cookieTheme) !== -1 ? cookieTheme : "";
    if (!finalTheme && valid.indexOf(legacyTheme) !== -1) finalTheme = legacyTheme;
    if (!finalTheme && valid.indexOf(legacyPref) !== -1) finalTheme = legacyPref;
    if (!finalTheme) finalTheme = fallback;

    document.documentElement.setAttribute("data-theme", finalTheme);
    document.cookie = "theme=" + finalTheme + "; path=/; max-age=31536000";
    try {
      localStorage.removeItem("theme");
      localStorage.removeItem("theme-pref");
    } catch (e) {}
  } catch (e) {}
})();
`

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Static theme boot script prevents first-paint theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeMigrationScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ThemeProvider initialTheme={DEFAULT_THEME}>
          {children}
          <FireWordEffect />
          <MountMessageList />
        </ThemeProvider>
      </body>
    </html>
  )
}
