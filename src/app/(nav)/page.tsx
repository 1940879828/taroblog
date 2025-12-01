import HappyCover from "@/components/HappyCover";
import Head from "next/head";
import React from "react";
import HomeRoadMap from "@/components/Home/HomeRoadMap";

export default function Home() {
  // 网站信息
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TaroBlog",
    url: "https://taroblog.top",
    description: "这是我的个人博客，分享技术文章和心得体会。",
  };

  // 面包屑导航
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "🧭路线图",
        item: "https://taroblog.top/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "📒笔记",
        item: "https://taroblog.top/notes/1",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "🔗友链",
        item: "https://taroblog.top/friend",
      },
    ],
  };

  // Logo 和品牌信息
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "taroblog",
    url: "https://taroblog.top",
    logo: "https://taroblog.top/icon.png",
    sameAs: [
      "https://blog.csdn.net/csdn1940879828",
      "https://github.com/1940879828/taroblog",
      "https://gitee.com/code-jay",
    ],
  };

  return (
    <>
      123123123123
      <HappyCover />
      <HomeRoadMap />
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
      </Head>
    </>
  );
}
