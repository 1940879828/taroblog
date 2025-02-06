---
title: 性能优化
date: 2025-02-06 11:59:25
tags: '性能优化'
categories: '性能优化'
---

# 性能优化

## 首屏加载优化

终极方案：SSR

### 思路

找原因，什么导致首屏加载慢？

- 网络延迟
- 资源太大，3M JS

网络延迟解决方案

- CDN
- 预加载 preload
- 预渲染 prerender

资源太大

- 包分 chunk
- 懒加载
- 公共资源 vender
- 缓存
  - 强缓存：不经常变动的资源
  - 协商缓存：经常变动的资源
  - 策略缓存(service-worker)：弱网或离线环境下使用的资源
  - 局部SSR(广告页，营销活动页)
  - pwa (冷门)

### 指标衡量

浏览器API (performance)

- FP (First Paint 首次绘制)
  - 首次绘制，标记浏览器渲染任何在视觉上不同于导航前屏幕内容的时间点
- FCP (First Contentful Paint)
  - 首次内容绘制，标记的是浏览器渲染第一针内容 DOM 的时间点，该内容可能是文本、图像、SVG 或者 `<canvas>` 等元素

不是通过浏览器API，计算方式有差别 (Mutation Observer)

- FMP (First Meaning Paint)
  - 首次有效绘制，标记主角元素渲染完成的时间点，主角元素可以是视频网站的视频控件，内容网站的页面框架也可以是资源网站的头图等。 
- LCP (Largest Contentful Paint)
  - 用户感知的主要内容加载速度，这通常包括页面上最显眼的元素，如大图像或文本块。

这些性能监听或者上报的代码，通常只写一次，web-tracker
- 性能采集
  - Performance
  - Mutation Observer
- 用户行为采集
  - 无痕埋点
  - 手动埋点
  - 可视化埋点
- 异常采集
  - react  ErrorBoundary
  - 异常捕获

ssr：可交互时间

 - TBT (Total Blocking Time)
 - TTI (Time to Interactive)

其他：web-vitals、性能采集截屏或录像(rrWeb)

### 具体优化细节

- 优化图片： WebP 格式，不要用太大的图片 (头像控制 size 200*200)
- 组件按需加载：React Suspense + React.lazy
- 延迟加载：滚动加载，可视区内容渲染
- tree-shaking：打包工具自带
  - ESM (模块化) 
- CDN：oss + cdn
- 精简三方库：
  - 库按需导入
  - 国际化文件，移除不需要的语言文件
- 缓存
- 字体压缩：font-spider 移除无用字体, webfont处理字体加载
- SSR(server side render)、SSG(server side generate)

### 具体实现的进阶

- 预加载：preload

```html
<link rel="preload" href="xxx.js" as="script">
```

- 加载关键 CSS

提取关键css，webpack-css-extra-plugin、webpack-prerender-plugin
提取到的css内联插入到节点

- HTTP/2 Server Push
- 延迟加载

```html
<!-- dom 要不要等 js -->
<script defer async></script>
```

- 预渲染
- SSR
  - react Next
  - vue Nuxt