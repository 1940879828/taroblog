import type { Metadata } from "next";
import "./globals.css";
import MountMessageList from "@/components/MountMessageList";
import FireWordEffect from "@/providers/fireword";
import ThemeProvider from "@/components/ThemeProvider";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import type React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TaroBlog",
  description:
    "探索前端开发、区块链技术、Web性能优化、JavaScript、Vue、React、PHP、Laravel、MongoDB、MySQL等技术的深度解析与实践。本博客涵盖了从基础到进阶的技术内容，包括CSS、HTML、Git、WebSocket等，适合开发者提升技能与解决实际问题。",
  alternates: {
    canonical: "https://taroblog.top", // 设置 canonical URL
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
        alt: "beautiful cover",
      },
    ],
    locale: "zh_CN", // 页面的语言和地区
    type: "website", // 页面类型，如 'website', 'article' 等
  },
};

const VALID_THEMES = ["cupcake", "dark"] as const;

// 内联迁移脚本：在 React 水合 / 首屏绘制之前同步执行，
// 把老用户的 localStorage 主题一次性迁移到 cookie，回到单一 cookie 源。
const themeMigrationScript = `
(function () {
  try {
    var valid = ${JSON.stringify(VALID_THEMES)};
    var cookieTheme = (document.cookie.match(/(?:^|; )theme=([^;]+)/) || [])[1];

    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}

    var finalTheme = cookieTheme || "";
    // 只有 cookie 缺失、且 localStorage 有合法旧值时才迁移，防止旧数据覆盖新数据
    if (!finalTheme && valid.indexOf(stored) !== -1) {
      document.cookie = "theme=" + stored + "; path=/; max-age=31536000";
      finalTheme = stored;
    }

    if (valid.indexOf(finalTheme) !== -1) {
      document.documentElement.setAttribute("data-theme", finalTheme);
    }

    // 迁移后清理 localStorage，回归单一 cookie 源
    try { localStorage.removeItem("theme"); } catch (e) {}
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const initialTheme = VALID_THEMES.includes(cookieTheme as never)
    ? (cookieTheme as (typeof VALID_THEMES)[number])
    : "cupcake";

  return (
    <html
      lang="zh"
      data-theme={initialTheme}
      className="theme-transition"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeMigrationScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ThemeProvider initialTheme={initialTheme}>
          {children}
          <FireWordEffect />
          <MountMessageList />
        </ThemeProvider>
      </body>
    </html>
  );
}
