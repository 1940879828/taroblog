import type { Metadata } from "next";
import "./globals.css";
import MountMessageList from "@/components/MountMessageList";
import FireWordEffect from "@/providers/fireword";
import localFont from "next/font/local";
import Head from "next/head";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialTheme = cookieStore.get("theme")?.value || "cupcake";

  return (
    <html lang="zh" data-theme={initialTheme} className="theme-transition">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        {children}
        <FireWordEffect />
        <MountMessageList />
      </body>
    </html>
  );
}
