---
title: Next.js 面试学习笔记 · 索引
tags: ['Next.js']
date: 2026-08-19 00:00:00
categories: ['前端','Next.js']
description: "面向 Next 专岗面试的系统学习笔记索引，以 Next 核心机制为主线，含渲染模型、App Router 路由、RSC、数据缓存、Server Actions、性能工程化六章。"
---

# Next.js 面试学习笔记 · 索引

> 面向 **Next 专岗面试**，React 基础扎实，源码"了解核心实现思路"即可。
> 时间预算短 → **以 Next 核心机制为主线**，面试题只作为每章自测，不按题单学习。

## 学习方法（主线思维）

```
不是"背面试题"，而是：
  理解机制 → 用最小实验验证 → 用面试题自测 → 能用自己的话讲清楚
```

每条机制问三个问题：

1. **它解决了什么问题？**（动机 / 不引入它的痛点）
2. **它是怎么工作的？**（机制 / 核心流程）
3. **代价与边界是什么？**（局限 / 坑 / 与别的机制怎么取舍）

## 章节导航（6 章主线）

| # | 主题 | 笔记 | 实验区 | 状态 |
|---|------|------|--------|------|
| 1 | 渲染模型：SSR/CSR/SSG/ISR 与 水合 | [01-渲染模型.md](/note/01-渲染模型) | `src/app/lab/rendering` | ✅ |
| 2 | App Router 路由：文件系统路由、匹配原理、动态/捕获段、layout 状态、并行/拦截路由 | [02-App-Router-路由.md](/note/02-App-Router-路由) | `src/app/lab/routing` | ✅ |
| 3 | React Server Components：RSC vs SSR、`'use client'`、Server 限制、边界、window 坑 | [03-React-Server-Components.md](/note/03-React-Server-Components) | `src/app/lab/rsc` | ✅ |
| 4 | 数据获取与缓存：fetch 策略、async 组件、四层缓存、revalidate、静态 vs 动态 | [04-数据获取与缓存.md](/note/04-数据获取与缓存) | `src/app/lab/data` | ✅ |
| 5 | Server Actions：`'use server'` 原理、与 API Route 区别、渐进增强 | [05-Server-Actions.md](/note/05-Server-Actions) | `src/app/lab/actions` | ✅ |
| 6 | 性能 / 部署 / 工程化：next/image、流式渲染、next build、Next 16 新特性 | [06-性能部署与工程化.md](/note/06-性能部署与工程化) | `src/app/lab/perf` | ✅ |

> ⚠️ 章节序号基于已确认的学习顺序；内容写成后可再调整，但主线不变。

## 配套代码实验区

- 位置：`src/app/lab/**`（独立路由段，不影响博客本身的页面）
- 形式：**可运行的 Next 最小实验**，每个实验页都附"观察什么、怎么验证"
- 入口：[/lab](/lab)（本地开发为 `http://localhost:3000/lab`）
- 验证方法：
  - `pnpm dev`：开发模式，**所有页面每次请求都重新渲染**，主要用于看交互
  - `pnpm build && pnpm start`：生产模式，**才能看到 静态/动态 的真实划分**（build 日志会打印 `○` 静态 / `ƒ` 动态 标记，末尾有图例）

## 复习节奏建议（短时间）

1. 每章先读"主线一句话" → 再快速过机制 → 跑对应实验
2. 面试前：只看每章末尾的**自测题**，能不看答案讲清即通过
3. 重点章节优先级：**1 > 3 > 4 > 2 > 5 > 6**（1 是一切的基础）
