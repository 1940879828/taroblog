---
title: Next.js 面试 · React Server Components
tags: ['Next.js']
date: 2026-08-19 00:00:00
categories: ['前端','Next.js']
description: "RSC 与 SSR 的本质区别、'use client' 边界的真实含义、Server 组件的限制与 window 坑、服务端/客户端组件树如何组合。"
---

# 第 3 章 · React Server Components：RSC vs SSR、`'use client'` 边界、Server 限制

> 本章主线一句话：**RSC 不是一种"渲染模式"，而是一种"组件模型"——它让一个组件树里可以同时存在"只在服务端运行"和"只在客户端运行"的两类组件，从根上决定"哪些代码、哪些数据、哪些依赖会被发给浏览器"；`'use client'` 不是"变成客户端渲染"，而是"声明一个边界"。**

---

## 3.0 为什么需要 RSC（动机）

先回答那个最容易被问倒的问题：**SSR 已经能在服务端渲染出 HTML 了，为什么还要 RSC？**

因为两者解决的是**完全不同的问题**：

- **SSR** 解决"首屏快、SEO 好"——让服务端提前算出 HTML。
- **RSC** 解决"**少发 JS、少发数据、少跑客户端代码**"——让服务端组件**根本不进浏览器**。

没有 RSC 时（传统 React / Pages Router）：无论你需不需要，**整棵组件树 + 所有依赖 + 所有逻辑**都会打包进 JS 发给浏览器。一个纯展示的组件，也要把 `marked`、`gray-matter` 这类只在服务端用的库一起塞给用户。

RSC 的价值一句话：**服务端组件的代码和依赖只留在服务端，浏览器拿到的只是它的"渲染结果"（序列化的 HTML/数据），不包含它的 JS。**

---

## 3.1 先分清三组极易混淆的概念（本章地基）

### 1. RSC ≠ SSR（面试最高频）

| | RSC（组件模型） | SSR（渲染方式） |
|---|---|---|
| 回答的问题 | 组件**跑在哪、发不发 JS** | HTML **什么时候、在哪生成** |
| 作用对象 | 单个组件 | 整个请求/页面 |
| 关键结果 | 服务端组件不进 bundle | 服务端吐出完整 HTML |

**两者正交，可以组合**：一个 RSC 服务端组件，可以被 SSR 渲染成 HTML（也可以被静态化）。"RSC 页面"默认就是"服务端组件 + SSR/SSG"。

> 记忆锚点：**SSR 是"把渲染挪到服务端"，RSC 是"把组件本身留在服务端"**。前者是时间/地点问题，后者是"代码归属"问题。

### 2. Server Component ≠ Server 端渲染的普通组件

普通 SSR 里，组件**两端都跑**：服务端渲染出 HTML，客户端再跑一遍做水合（hydrate）。而 **Server Component 只在服务端跑一次，客户端不执行它的代码、也不水合它**——它没有自己的状态和事件。

### 3. `'use client'` ≠ "客户端渲染"

`'use client'` 的真实含义是：**"从这个组件往下，进入客户端边界"**。它标的是"边界（boundary）"，不是"渲染模式"。一个 `'use client'` 组件**依然会被 SSR 预渲染出 HTML**，只是它的 JS 会被发给浏览器、并参与水合。

---

## 3.2 Server Component 的能力与限制

### 能力（Server 组件可以做什么）

- 直接访问后端资源：读文件系统（`fs`）、查数据库、调用内部 API（无鉴权暴露）。
- 使用只在服务端存在的库（`gray-matter`、`marked` 等），**这些不会进浏览器 bundle**。
- 直接 `await` 数据（`async` 组件，React 19 支持），不用 `useEffect` 取数。
- 安全地持有密钥、token（不会泄露给客户端）。

### 限制（Server 组件**不能**做什么——面试常考）

| 限制 | 原因 |
|---|---|
| 不能用 `useState` / `useEffect` / `useReducer` 等 hooks | 它没有客户端生命周期，不水合 |
| 不能用事件处理器（`onClick` 等） | 事件只在客户端有意义 |
| 不能用浏览器 API（`window`、`document`、`localStorage`） | 服务端没有这些对象 |
| 不能 `import` 客户端组件后直接传函数作为 props | 函数无法跨服务端→客户端边界序列化 |

> 核心心法：**"交互"和"浏览器态"必须交给客户端组件**。服务端组件负责"读数据、算结果、出 HTML"，客户端组件负责"响应用户、读写浏览器"。

---

## 3.3 `'use client'` 边界：怎么组合一棵"混合树"

这是 RSC 最需要理解的部分。规则：

1. **文件顶部写 `'use client'`，这个文件及其 `import` 进来的所有组件，都进入客户端边界**（变成"客户端组件"）。
2. **Server 组件可以 `import` 客户端组件**（把客户端组件当作一个"岛屿"嵌入服务端树）。
3. **客户端组件不能直接 `import` 服务端组件**——因为服务端组件不能进客户端 bundle。只能通过 **props（children）** 把服务端组件"传进去"。

### 典型组合模式

```tsx
// page.tsx —— 服务端组件（默认）
import ClientCounter from "./ClientCounter"; // 引入客户端岛屿
import ServerCard from "./ServerCard";       // 服务端组件

export default async function Page() {
  const data = await fetchData();            // 服务端直接取数
  return (
    <div>
      <ServerCard data={data} />              {/* 服务端渲染 */}
      <ClientCounter>
        <ServerCard data={data} />            {/* 服务端组件作为 children 传给客户端组件 */}
      </ClientCounter>
    </div>
  );
}
```

```tsx
// ClientCounter.tsx —— 客户端组件
"use client";
import { useState } from "react";

export default function ClientCounter({ children }) {
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      点击了 {n} 次
      {children}  {/* 这里可以放服务端组件，因为 children 是"提前算好的结果" */}
    </button>
  );
}
```

> 关键点：客户端组件"包住"服务端组件，靠的是 **`children` 透传**——服务端组件先在服务端渲染成结果，再作为"内容"塞进客户端组件。客户端组件**不知道也不需要知道** children 是怎么来的。

---

## 3.4 window 坑：为什么服务端组件访问 `window` 会报错（本章最常考）

结合第 1 章"SSR 时 `window` 为什么 undefined"：

- **Server Component 在 Node 环境执行**，没有 `window` / `document` / `localStorage`。
- 如果在服务端组件里直接 `window.xxx`，会在**构建/服务端渲染时**抛 `ReferenceError: window is not defined`。

### 怎么处理（三种，从根因出发）

1. **把用 `window` 的逻辑放进 `'use client'` 组件**，用 `useEffect` 包住（只在客户端跑）：
   ```tsx
   "use client";
   import { useEffect, useState } from "react";
   export default function ClientOnly() {
     const [w, setW] = useState(0);
     useEffect(() => setW(window.innerWidth), []); // 只在客户端执行
     return <div>宽：{w}</div>;
   }
   ```

2. **用 `mounted` 判断延迟渲染**（和第 1 章水合 mismatch 的处理一致）：
   ```tsx
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   if (!mounted) return <Skeleton />;
   ```

3. **把浏览器态在服务端用 `cookies()` / `headers()` 等动态 API 读取**，通过 props 传给客户端组件，而不是让客户端去读 `localStorage`。

---

## 3.5 数据获取：服务端组件怎么"直接取数"

RSC 最舒服的一点：**服务端组件直接 `await` 数据，不需要 `useEffect`**。

```tsx
export default async function Page() {
  const user = await db.user.findFirst();   // 直接查库
  return <div>{user.name}</div>;
}
```

对比传统客户端取数：

| | 服务端组件取数 | 客户端 `useEffect` 取数 |
|---|---|---|
| 代码 | `const x = await fetch()` | `useEffect(() => { fetch().then(setX) })` |
| 数据暴露 | 只在服务端，不暴露接口 | 接口暴露给浏览器，可被抓包 |
| 水合前数据 | 已渲染进 HTML | 水合后才请求，有 loading |
| 往返 | 少一次客户端请求 | 多一次客户端→服务端请求 |

> 这也解释了第 1 章留下的伏笔：为什么 Next 15+ `fetch` 默认不缓存——为了让服务端组件的取数行为更可预期（详见第 4 章）。

---

## 3.6 Next 中的默认与边界规则（速查）

| 问题 | 答案 |
|---|---|
| 默认组件是什么类型？ | **服务端组件**（不写 `'use client'` 就是 Server Component） |
| 怎么声明客户端组件？ | 文件顶部 `'use client'` |
| Server 能 import Client 吗？ | 能 |
| Client 能 import Server 吗？ | 不能（只能靠 children 传） |
| Server 能用 hooks 吗？ | 不能 |
| Server 能用浏览器 API 吗？ | 不能 |
| `'use client'` 会阻止 SSR 吗？ | 不会，客户端组件依然 SSR 出 HTML |

---

## 3.7 代码实验

> 实验区路径按 README 规划为 `src/app/lab/rsc/`（当前尚未创建，属"待建"状态）。以下为建议实验清单，落地时参考 `lab/rendering` / `lab/routing` 的体例。

建议的最小实验（每个标注"看什么"）：

| 实验 | 目录 | 验证目标 |
|---|---|---|
| Server 取数 | `server-data/`（async 组件直接 `await`） | 服务端取数、数据进 HTML、不暴露接口 |
| Client 边界 | `client-boundary/`（`'use client'` + `useState`） | 客户端组件的状态与事件 |
| window 坑 | `window-pitfall/`（服务端直接 `window`） | 服务端访问 window 报错 + 正确写法 |
| 混合树 | `hybrid/`（Server import Client + children 透传） | 服务端组件嵌客户端组件 |

**观察方法**：

- `pnpm dev`：看交互、报错。
- `pnpm build && pnpm start`：右键查看网页源码，确认服务端组件的内容在 HTML 里、客户端组件的 JS 在 bundle 里；看 build 日志静态/动态标记。

---

## 3.8 面试自测题

<details>
<summary>1. RSC 和 SSR 的区别是什么？</summary>

RSC 是组件模型，决定"组件跑在服务端还是客户端、发不发 JS"；SSR 是渲染方式，决定"HTML 什么时候、在哪生成"。两者正交可组合：RSC 服务端组件可以被 SSR 渲染成 HTML。SSR 把渲染挪到服务端，RSC 把组件本身留在服务端。
</details>

<details>
<summary>2. Server Component 能做哪些、不能做哪些？</summary>

能做：直接访问文件/数据库/内部 API、用服务端专属库、async 取数、持有密钥。不能做：用 useState/useEffect 等 hooks、用事件处理器、用 window/document 等浏览器 API、把函数作为 props 传给客户端组件。
</details>

<details>
<summary>3. 'use client' 的真实含义是什么？</summary>

声明"客户端边界"，不是"客户端渲染"。它表示该文件及其 import 的组件进入客户端 bundle、参与水合，但依然会被 SSR 预渲染出 HTML。
</details>

<details>
<summary>4. 服务端组件怎么嵌入客户端组件？</summary>

通过 props（children）透传：服务端组件先在服务端渲染成结果，再作为 children 内容传给客户端组件。客户端组件不能直接 import 服务端组件。
</details>

<details>
<summary>5. 为什么服务端组件访问 window 会报错？怎么解决？</summary>

因为服务端组件在 Node 环境执行，没有 window 对象。解决：把用 window 的逻辑放进 'use client' 组件并用 useEffect 包住；或用 mounted 判断延迟渲染；或服务端用 cookies/headers 动态 API 读取后通过 props 传下去。
</details>

<details>
<summary>6. 服务端组件取数相比 useEffect 取数有什么优势？</summary>

代码更简洁（直接 await）、数据不暴露接口更安全、水合前数据已进 HTML（少一次往返）、无客户端 loading 闪烁。useEffect 取数需要多一次客户端请求且暴露接口。
</details>

<details>
<summary>7. Next 里组件默认是服务端还是客户端？怎么切换？</summary>

默认服务端组件。写 'use client' 切换为客户端组件。
</details>

---

## 3.9 常见追问（加分项）

- **"Server Component 会被水合吗？"**：不会。它只在服务端渲染，客户端不执行它的代码、不挂状态和事件，因此不参与水合。这也是它"不发 JS"的根本原因。
- **"客户端组件会被 SSR 吗？"**：会。`'use client'` 不阻止 SSR，客户端组件依然在服务端渲染出 HTML，水合后才可交互。
- **"为什么客户端组件不能 import 服务端组件？"**：服务端组件可能依赖只在服务端存在的东西（fs、密钥、内部 API），如果被打进客户端 bundle 就会泄露或报错。所以只能反向：服务端组件 import 客户端组件，或通过 children 透传。
- **"RSC 和 Server Actions 是什么关系？"**：RSC 是"服务端组件"，Server Actions（`'use server'`）是"服务端函数"，两者都跑在服务端，但一个是组件、一个是可被客户端调用的函数（第 5 章详讲）。

---

> 下一章：**第 4 章 数据获取与缓存** —— fetch 策略、async 组件、四层缓存、revalidate、静态 vs 动态。本章的"服务端组件直接 await 取数"正是第 4 章"数据获取"的载体，两章强衔接。
