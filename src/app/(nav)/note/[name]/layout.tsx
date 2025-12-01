import { getNoteDetail } from "@/lib/note";
import type { Metadata } from "next";
import type React from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    name: string;
  }>;
}): Promise<Metadata> {
  const { name } = await params;
  const note = await getNoteDetail(name);

  // 优化 meta 信息
  return {
    title: `${decodeURI(note.title)} | TaroBlog`,
    description: note.description
      ? note.description
      : note.content.slice(0, 100),
    alternates: {
      canonical: `https://taroblog.top/note/${note.fileName}`,
    },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      url: `https://taroblog.top/note/${note.fileName}`,
      siteName: "TaroBlog",
      publishedTime: note.date,
      authors: ["Taro"],
      tags: note.tags,
    },
    // 添加更多结构化数据
    other: {
      "article:published_time": note.date,
      "article:author": "Taro",
      "article:tag": note.tags?.join(","),
    },
  };
}

export default function NoteDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
