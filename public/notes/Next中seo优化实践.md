---
title: "Next中seo优化实践✨"
date: 2025-02-19 10:22:21
tags: ['Next','React','seo']
categories: ['前端','React','Next']
description: "Next.js框架SEO实战指南：详解TDK设置技巧、SSR/SSG特性应用、结构化数据集成与性能优化策略，提升页面收录效率与搜索排名的完整解决方案"
---

## TDK优化：提升页面元信息质量

TDK是SEO优化的三大基石：

 - Title：页面标题（60字符内）
 - Description：页面描述（160字符内）
 - Keywords：页面关键词（建议3-5个核心词）

### Next.js动态TDK配置

在Next中，TDK都使用generateMetadata函数进行添加，每个页面的layout都可以有不同的TDK

文章详情页 - 将文章标题显示到网页标签title上

文件：src/app/note/[name]/layout.tsx

```tsx
export async function generateMetadata({params}: {
  // 动态路由
  params: Promise<{
    name: string
  }>
}) {
  let { name } = await params
  const {data} = await getNoteDetail(name)
  return {
    title: `${decodeURI(data.title)} | TaroBlog`
  }
}
```

### Next.js静态页面TDK配置

文件：src/app/page.tsx

```javascript
export const metadata: Metadata = {
    title: "TaroBlog",
    description: "探索前端开发、区块链技术、Web性能优化、JavaScript、Vue、React、PHP、Laravel、MongoDB、MySQL等技术的深度解析与实践。本博客涵盖了从基础到进阶的技术内容，包括CSS、HTML、Git、WebSocket等，适合开发者提升技能与解决实际问题。",
    alternates: {
        canonical: 'https://taroblog.top', // 设置 canonical URL
    },
    keywords: "前端开发, JavaScript, Vue, React, PHP, Laravel, MongoDB, MySQL, CSS, HTML, Git, WebSocket, 智能合约, 性能优化, 闭包, 跨域, 计算机网络, 节流与防抖, 宏任务, 微任务, 回流与重绘, 前端性能优化, Web开发, 技术博客",
    authors: {name: "TaroBlog"},
    robots: "index, follow",
    openGraph: {
        title: 'TaroBlog',
        description: 'TaroBlog技术博客',
        url: 'https://taroblog.top', // 页面的完整 URL
        siteName: 'TaroBlog',
        images: [
            {
                url: 'https://t.alcy.cc/acg', // Open Graph 图片 URL
                width: 800,
                height: 600,
                alt: 'beautiful cover',
            },
        ],
        locale: 'zh_CN', // 页面的语言和地区
        type: 'website', // 页面类型，如 'website', 'article' 等
    }
}
```

## sitemap.xml站点地图与搜索引擎提交

### 自动化站点地图生成

使用next-sitemap自动化生成sitemap: [next-sitemap npm](https://www.npmjs.com/package/next-sitemap)

使用next-sitemap的配置：
```javascript
module.exports = {
    // 网站根域名（优先从环境变量获取，否则使用默认值）
    siteUrl: process.env.SITE_URL || 'https://taroblog.top',
    // 是否自动生成robots.txt文件（建议开启）
    generateRobotsTxt: true,
    // 单个sitemap文件最大条目数（超过将自动分割）
    // 大型站点建议设置为5000（Google限制每个sitemap最多5万条）
    sitemapSize: 5000,
    // 默认页面优先级（0.0-1.0）
    priority: 0.7,
    // 动态生成每个页面的sitemap配置
    transform: async (config, path) => ({
        loc: path,          // 页面路径（自动拼接siteUrl）
        // 页面更新频率策略
        changefreq: path === '/' ? 'daily' : 'weekly',
        // 首页每天更新，其他页面每周
        // 页面优先级（首页设为最高1.0）
        priority: path === '/' ? 1 : config.priority,
        // 最后修改时间（ISO格式）
        // 生产环境建议从CMS获取真实更新时间
        lastmod: new Date().toISOString(),
    })
}
```

### 搜索引擎提交

[百度站长资源平台](https://ziyuan.baidu.com/?castk=LTE%3D)

[谷歌网站管理员工具](https://developers.google.com/search?hl=zh-cn)

[必应网站管理员工具](https://www.bing.com/webmasters/about)


## 结构化数据深度优化

文章详情页增强标记

```tsx
// ......
// 动态生成 JSON-LD 数据
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: note.title,
  description: note.description,
  author: {
    '@type': 'Person',
    name: "Taro",
  },
  datePublished: note.date,
  publisher: {
    '@type': 'Organization',
    name: 'Taro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.taroblog.top/icon.png',
    },
  },
};
return (
  <div className="w-container flex-nowrap flex flex-col">
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Head>
    <BackButton className="mt-4" />
    <div className="mt-2">: {note.title}</div>
    <Markdown content={note.content} />
  </div>
)
// ......
```

首页结构化数据组合

```tsx
import Head from 'next/head';

export default function HomePage() {
  // 网站信息
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '我的博客',
    url: 'https://example.com',
    description: '这是我的个人博客，分享技术文章和心得体会。',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://example.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // 面包屑导航
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: 'https://example.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '博客',
        item: 'https://example.com/blog',
      },
    ],
  };

  // Logo 和品牌信息
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '我的博客',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    sameAs: [
      'https://twitter.com/example',
      'https://github.com/example',
    ],
  };

  return (
    <div>
      {/* 插入 JSON-LD 数据 */}
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

      <h1>欢迎来到我的博客</h1>
      <p>这里是博客首页，分享技术文章和心得体会。</p>
    </div>
  );
}
```

> 搜索和查询以下文章：
> 
> [从前端工程师的角度将SEO做到极致🌈](https://juejin.cn/post/7380688287549800467?searchId=202502190955108ACF470C1192C039B75F)
> 
> [⛳前端进阶：SEO 全方位解决方案](https://juejin.cn/post/7241813423460581435)
>
> [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
> 
> [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)
