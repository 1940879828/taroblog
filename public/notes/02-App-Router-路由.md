---
title: Next.js 面试 · App Router 路由
tags: ['Next.js']
date: 2026-08-19 00:00:00
categories: ['前端','Next.js']
description: "App Router 文件系统路由、动态/捕获段匹配优先级、layout 状态保留、并行路由与拦截路由，附实测踩坑记录与代码实验。"
---

# 第 2 章 · App Router 路由：文件系统路由、匹配原理、布局状态、并行 / 拦截路由

> 本章主线一句话：**App Router 把"URL 路径 ↔ 文件树 ↔ 组件树"三者焊死成一套约定——文件放哪、组件就渲染在哪，URL 怎么匹配、哪段组件保留状态，都由这套"段（segment）"约定推导出来，几乎不用写路由表。**

---

## 2.0 为什么需要 App Router（动机）

旧 Pages Router 的问题：路由、布局、数据获取、渲染模式各自为政，嵌套布局要手动 `_app` / `_document`，页面级状态在切换时全量重建，没有统一的"段"概念。

App Router 的核心抽象是 **segment（段）**：URL 里每一段 `/a/b/c` 就是 `a`、`b`、`c` 三个段，每个段对应文件系统里一个文件夹，文件夹里用约定文件（`page.tsx` / `layout.tsx` / `loading.tsx` 等）声明"这段要渲染什么"。由此带来三个收益：

1. **布局可嵌套且保留状态**：`layout` 包住子路由，切换子路由时父 `layout` 不重新挂载。
2. **并发加载**：每个段可并行取数据、可各自 `loading` / `error`。
3. **路由 = 文件**：不用维护路由表，删除文件即删除路由。

> 记忆锚点：App Router 的"路由"其实是**两层约定**——① 文件系统怎么映射成 URL（segment）；② 每个段里约定文件名怎么映射成角色（page/layout/loading/...）。

---

## 2.1 文件系统路由：从路径到 URL 的映射

### 1.1 基本规则

`app/` 下的文件夹结构即路由结构，`page.tsx` 是该段可被访问的入口：

```
app/
├── page.tsx          → /          （首页）
├── about/
│   └── page.tsx      → /about
└── blog/
    ├── page.tsx      → /blog
    └── [slug]/
        └── page.tsx  → /blog/任意值   （动态段）
```

**关键点（面试常考）**：

- **没有 `page.tsx` 的文件夹不产生可访问路由**，但可用来"分组"（见 2.2 路由组）或挂 `layout`。
- 根 `app/page.tsx` 对应 `/`，根 `app/layout.tsx` 是所有页面的外壳（`html` / `body` 必须在这里）。

### 1.2 段与嵌套 layout 的模型

每层文件夹可以有自己的 `layout.tsx`，它会**包裹**该层及其所有子段的 `page`：

```
app/
├── layout.tsx          （根 layout：包住所有）
├── dashboard/
│   ├── layout.tsx      （dashboard 的侧边栏，包住 dashboard/* 所有页）
│   ├── page.tsx        → /dashboard
│   └── settings/
│       └── page.tsx    → /dashboard/settings
```

渲染时嵌套关系是：`根 layout → dashboard layout → page`。**这是"布局状态保留"的根**：从 `/dashboard` 切到 `/dashboard/settings` 时，`dashboard/layout.tsx` 和根 `layout.tsx` **不会重新挂载**，只有里面的 `page` 换掉——侧边栏的滚动位置、已展开的菜单、`useState` 状态全部保留。

> 面试加分点：能说出"布局状态保留"的本质是 **React 复用同一位置的组件**——layout 在嵌套树里位置不变，React 就复用它的实例；如果布局位置变了（见 2.3 并行路由的 slot 交换），状态才会丢。

---

## 2.2 路由组与动态段 / 捕获段

### 2.1 路由组 Route Group（`(folder)`）

用括号命名的文件夹**不参与 URL 路径**，只用于组织代码 / 共享 layout：

```
app/
├── (marketing)/
│   ├── layout.tsx     （只包 marketing 这一组）
│   ├── about/
│   │   └── page.tsx   → /about   （注意：不是 /marketing/about）
│   └── page.tsx       → /
└── (shop)/
    └── page.tsx       → /shop   （此处 shop 是真实路径段）
```

- 用途：让不同页面组有不同 layout，却共享同一 URL 前缀（或干脆无前缀）。
- 本项目 `src/app/` 就用了 `(nav)` / `(noNav)` 分组来区分"带导航栏 / 不带导航栏"的页面，URL 不受影响。

### 2.2 动态段 Dynamic Segment（`[slug]`）

- `[slug]` 匹配**单个**任意值：`/blog/[slug]` 匹配 `/blog/a`，不匹配 `/blog/a/b`。
- 组件内通过 `params` 拿到值：`({ params }: { params: Promise<{ slug: string }> })`（Next 15+ `params` 是 `Promise`，需 `await`）。
- 动态段常见搭档是 `generateStaticParams`（第 4 章详讲）——把已知的 slug 在构建时预渲染成静态页。

### 2.3 捕获段 Catch-all（`[...slug]`）

- `[...slug]` 匹配**任意多层**：`/docs/[...slug]` 匹配 `/docs`、`/docs/a`、`/docs/a/b`。
- 可选的捕获段 `[[...slug]]`：连 `/docs` 这一层本身也算（`/docs` 时 `slug` 为空数组）。

### 2.4 匹配优先级（面试常考）

同一路径可能被多个规则命中时，Next 的优先级：

```
静态段 > 动态段 [slug] > 捕获段 [...slug]
```

即 `/blog/new` 若同时存在 `blog/new/page.tsx`（静态）和 `blog/[slug]/page.tsx`（动态），优先命中静态 `new`。**坑**：如果 `new` 是动态内容却写死了静态段，会永远抢不到动态分支。

> **实测佐证（本项目 `pnpm build`）**：`segments/new/page.tsx` 在 build 日志里标记 `○`（Static），而 `segments/[slug]/page.tsx` 标记 `ƒ`（Dynamic）——静态段在构建时就被预渲染，动态段兜底其余值。优先级不是"理论规则"，直接体现在构建产物上。

---

## 2.3 布局、状态保留、约定文件全家桶

### 3.1 状态保留的边界（本章最常考）

**切子路由，父 layout 状态保留**；**切到"不同位置的 layout"，状态不保留**。判断标准是"组件在 React 树里的位置是否变了"：

- `/dashboard` → `/dashboard/settings`：`dashboard/layout` 位置不变 → **保留**。
- `/dashboard` → `/home`：两个页面在根 layout 下是兄弟，各自全新挂载 → **不保留**。
- 并行路由里 slot 内容被 `default.tsx` 或导航替换时，对应 slot 的位置内容变化 → **不保留**（见 2.5）。

> 与第 1 章的衔接：layout 里用了动态 API（`cookies()` 等）会把整棵子树拖成动态（第 1 章 1.6 已讲）。本项目根 `layout.tsx` 现已**不再用 `cookies()`**，改为 head 内联脚本同步主题，因此下面 `lab/routing` 的实验能干净地观察静态/动态，不被根 layout 干扰。

### 3.2 约定文件（Special Files）角色表

| 文件 | 角色 | 备注 |
|---|---|---|
| `layout.tsx` | 包住子段的持久外壳 | 切子路由不重新挂载 |
| `page.tsx` | 该段的可访问页面 | 必须有它才产生路由 |
| `loading.tsx` | 段级 Suspense 兜底 | 导航时自动包裹，显示加载态 |
| `error.tsx` | 段级错误边界 | 必须 `"use client"`，`reset()` 可重试；**只能捕获运行时错误，捕获不到构建期错误**（见下方实测） |
| `not-found.tsx` | 404 兜底 | 越靠近出错段的优先级越高 |
| `route.ts` | 非页面 API 端点 | 与 `page.tsx` 同段二选一 |
| `template.tsx` | 类似 layout 但每次切换都重挂载 | 需要重置状态/动画时用 |
| `default.tsx` | 并行路由未命中 slot 时的兜底 | 见 2.5 |

> 记忆锚点：`layout` 是"持久"，`template` 是"每次重来"——需要状态保留用 layout，需要每次切换重置（如页面进入动画、重置滚动）用 template。

---

## 2.4 Link 导航与客户端路由

- `<Link href="/about">` 触发的导航**不整页刷新**，只在客户端替换变化的那一段组件树，这就是"布局状态保留"能成立的前提。
- 预取（prefetch）：`Link` 进入视口时预取目标段数据，生产模式下默认预取。
- `useRouter().push` / `usePathname` / `useSearchParams` 等客户端 hooks 需在 `"use client"` 组件里用。
- 坑：`useSearchParams` 读的是 URL 查询参数（`?a=1`），这是**动态 API**——参数每个请求都不同，Next 无法在构建时定死 HTML，所以用了它的页面会被降级成**动态渲染（`ƒ`）**。若页面本就应该动态（如搜索结果页）无所谓；若页面大部分是静态、只有一小块要读参数，把那一块抽成客户端组件并用 `<Suspense>` 包住，才能避免整页变动态（Suspense 本身不会让页面"变回静态"，它只是隔离了那个不确定的部分，同时 Next 15+ 还会要求静态页里的 `useSearchParams` 必须被 Suspense 包裹，否则构建报错）。

---

## 2.5 并行路由与拦截路由（进阶，划清边界）

> 边界声明（对齐 README"源码了解思路即可"）：这两块是 App Router 最细碎、面试最"吓人"的部分，但**命中率低、深度要求浅**。本节只讲"是什么、解决什么、关键坑"，不讲完整实现。

### 5.1 并行路由 Parallel Routes（`@slot`）

用 `@` 开头的文件夹 = **slot**，同一段下多个 slot **并行渲染到同一个 layout**：

```
app/
└── dashboard/
    ├── layout.tsx
    ├── @analytics/
    │   └── page.tsx     （独立渲染，可各自 loading）
    ├── @team/
    │   └── page.tsx
    └── page.tsx
```

- `layout.tsx` 通过 `props.analytics` / `props.team` 拿到各 slot 的内容，手动摆放。
- 核心价值：**一个页面由多个独立子页面拼成**，每个子页面可独立加载、独立 loading、独立出错，互不阻塞。
- 关键坑：**导航到没有该 slot 定义的路径时，必须提供 `default.tsx` 兜底**，否则 404 或白屏。

### 5.2 拦截路由 Intercepting Routes（`(.)` / `(..)` / `(...)`）

在"不改动 URL"的情况下，**从别的页面切入时拦截并显示另一段内容**（典型：照片流里点开照片，URL 变成 `/photo/1` 但内容以 Modal 覆盖在当前页之上，而不是跳转整页）。

```
app/
├── feed/
│   └── page.tsx          （照片流列表）
└── photo/
    ├── [id]/
    │   └── page.tsx      （直达该照片：整页）
    └── (..)photo/
        └── [id]/
            └── page.tsx  （从 feed 点开时：被拦截，用 Modal 显示）
```

- 相对路径段 `(.)` 同层、`(..)` 上层、`(...)` 根 `app/`。
- 本质：**同一个 URL，取决于"你从哪来"渲染不同组件**——从 `feed` 进来走 `(..)photo/[id]`（Modal），直接访问 `/photo/1` 走整页 `photo/[id]`。
- 常与并行路由的 `@modal` slot 配合，实现"Modal 覆盖 + URL 可分享"。

---

## 2.6 对比 / 速查表

| 概念 | 写法 | 关键点 |
|---|---|---|
| 静态段 | `about/page.tsx` | 匹配优先级最高 |
| 动态段 | `[slug]/page.tsx` | 单段，`params` 拿值 |
| 捕获段 | `[...slug]/page.tsx` | 多段，优先级最低 |
| 可选捕获段 | `[[...slug]]/page.tsx` | 允许空 |
| 路由组 | `(group)/page.tsx` | 不参与 URL |
| 并行路由 slot | `@slot/page.tsx` | 需 `default.tsx` 兜底 |
| 拦截路由 | `(.)/` `(..)/` `(...)/` | 依"从哪来"渲染不同组件 |
| 布局持久 | `layout.tsx` | 切子路由不重挂 |
| 每次重置 | `template.tsx` | 每次切换重挂 |

**匹配优先级**：静态段 > 动态段 `[slug]` > 捕获段 `[...slug]`。

---

## 2.7 代码实验

位置：`src/app/lab/routing/`，入口 [/lab/routing](/lab/routing)。已建实验（均实测通过 `pnpm build`）：

| 实验 | 目录 | 验证目标 | build 标记（实测） |
|---|---|---|---|
| 文件系统路由 | `basics/`（`about`、`blog/[slug]`） | URL 与文件树映射、`params` 取值 | `about`→`○`；`blog/[slug]`→`ƒ` |
| 布局状态保留 | `layout-state/`（`one`、`two` + 带 `useState` 的 layout） | 切子路由，父 layout 输入框状态是否保留 | `one`/`two`→`○` |
| 动态 vs 捕获段 | `segments/`（`new`、`[slug]`、`docs/[...slug]`） | 匹配优先级 | `new`→`○`；`[slug]`→`ƒ`；`docs/[...slug]`→`ƒ` |
| 路由组 | `group/`（`(nav)` / `(noNav)`） | `(group)` 不影响 URL、可共享 layout | `nav-home`/`no-nav-home`→`○` |
| 约定文件 | `special-files/`（`slow`、`broken` + loading/error） | loading / error 兜底与触发 | `slow`/`broken`→`ƒ`（`force-dynamic`） |

**观察方法**（沿用第 1 章）：

- `pnpm dev`：交互 / 导航 / 布局状态保留直接看（在 `layout-state` 输入框打字后点 one/two）。
- `pnpm build && pnpm start`：build 日志看每段 `○` / `ƒ` 标记。

**实测踩坑（重点，直接对应笔记 2.3）**：

1. **顶层 `throw` 会在静态预渲染期让 build 失败**，`error.tsx` 捕获不到。初版 `broken/page.tsx` 直接 `throw new Error(...)`，结果 `pnpm build` 报 `Error occurred prerendering page ... exiting the build` 并退出。原因是：无动态 API 的页面默认静态预渲染（SSG），错误发生在**构建期**而非运行时。加 `export const dynamic = "force-dynamic"` 后，页面变 `ƒ`，错误才在**每次请求时**抛出、被 `error.tsx` 捕获。
   - **结论**：`error.tsx` 是**运行时**错误边界，只能兜住动态渲染页的运行时错误；静态页的构建期错误会直接阻断 build。
2. **`loading.tsx` 只在动态段导航时才稳定可见**。静态页在构建时已渲染完毕，导航时内容通常已就绪，loading 一闪而过甚至不出现。要稳定演示 loading，页面需 `force-dynamic`（本实验 `slow` 页即如此，`await` 2 秒，导航时可见 loading）。
3. 这两个坑本质是同一件事的两种表现：**静态预渲染 vs 动态渲染的边界，决定了"错误/加载态"发生在构建期还是运行时**——这正是第 1 章"渲染模型"在路由层落地时的直接后果。

---

## 2.8 面试自测题

<details>
<summary>1. App Router 里"路由"是怎么决定的？</summary>

由 `app/` 下的文件系统结构决定：文件夹 = URL 段（segment），`page.tsx` 声明该段可访问。没有路由表，删除文件即删除路由。
</details>

<details>
<summary>2. layout 和 page 的关系？切子路由时 layout 会重挂载吗？</summary>

layout 包住该段及其所有子段的 page，是持久外壳。切子路由时 layout 位置不变，React 复用其实例，不会重新挂载，状态（输入框、滚动、useState）保留；只有 page 被替换。
</details>

<details>
<summary>3. 为什么切到"不同页面"时状态又丢了？</summary>

状态保留的本质是"组件在 React 树里的位置是否不变"。同一 layout 下切子路由，layout 位置不变→保留；切到另一棵子树（不同 layout），组件全新挂载→不保留。
</details>

<details>
<summary>4. `[slug]` 和 `[...slug]` 的区别？</summary>

`[slug]` 匹配单个段（`/blog/a`），不匹配多层；`[...slug]` 捕获任意多层（`/docs/a/b/c`）。匹配优先级：静态段 > `[slug]` > `[...slug]`。
</details>

<details>
<summary>5. 路由组 `(folder)` 有什么用？它会影响 URL 吗？</summary>

用括号命名的文件夹不参与 URL，只用于组织代码、给不同页面组共享不同 layout。不影响 URL。
</details>

<details>
<summary>6. layout 和 template 的区别？什么时候用 template？</summary>

layout 持久，切子路由不重挂；template 每次切换都重挂。需要重置状态/触发进入动画/重置滚动时用 template。
</details>

<details>
<summary>7. loading.tsx / error.tsx / not-found.tsx 分别是做什么的？</summary>

loading 是段级 Suspense 兜底，导航时显示加载态；error 是段级错误边界（必须 use client，可 reset）；not-found 是 404 兜底，越靠近出错段优先级越高。
</details>

<details>
<summary>8. 为什么静态页里顶层 throw 会让 build 失败，而不是被 error.tsx 兜住？</summary>

无动态 API 的页面默认静态预渲染（SSG），错误在构建期就发生，此时页面还没进入运行时，error.tsx 无法介入。error.tsx 是运行时错误边界，只兜动态渲染页在每次请求时抛出的错误。要触发它，页面需 `export const dynamic = "force-dynamic"` 或用动态 API 使其变成动态渲染。
</details>

<details>
<summary>9. `<Link>` 导航和普通 `<a>` 有什么本质区别？</summary>

Link 走客户端路由，不整页刷新，只替换变化的那段组件树，因此布局状态能保留、速度更快；`<a>` 会整页刷新。
</details>

<details>
<summary>10. 并行路由 `@slot` 解决什么问题？关键坑是什么？</summary>

让一个页面由多个独立子页面（slot）并行渲染，各自独立 loading/出错/加载，互不阻塞。坑：导航到没有该 slot 的路径时必须提供 default.tsx 兜底，否则 404/白屏。
</details>

<details>
<summary>11. 拦截路由 `(..)` 解决什么问题？</summary>

在不改 URL 的情况下，根据"从哪来"渲染不同组件（如照片流里点开照片用 Modal 覆盖，而不是跳整页）。同一 URL 从 feed 进走拦截页，直接访问走整页。
</details>

---

## 2.9 常见追问（加分项）

- **"layout 会一直保留吗，什么时候会重建？"**：只有 layout 本身在 React 树中的位置变化时才重建——例如它依赖的 slot 内容被 `default.tsx` / 导航整体替换，或跨到另一棵布局子树。判断标准永远是"树位置是否变了"。
- **"为什么 `useSearchParams` 会让静态页变动态？"**：读 URL 参数是动态 API，渲染结果随请求而变，Next 无法在构建时确定输出，只能转动态（呼应第 1 章"动态 API 让路由变动态"）。若页面大部分静态、只有小块读参数，用 `Suspense` 包裹读参数的组件来隔离这一块，避免整页变动态；Suspense 不改变"渲染模式"，只是界定不确定范围，且 Next 15+ 静态页里 `useSearchParams` 必须被 Suspense 包裹否则构建报错。
- **"拦截路由和动态段都用 `(..)` 或 `[ ]`，怎么区分？"**：`()` 是路由组/拦截（组织与"从哪来"），`[]` 是动态段（匹配"是什么值"），两者正交、可叠加。
- **"App Router 的段和 Pages Router 的页面模型，本质差异是什么？"**：Pages Router 页面是扁平的、页面间独立；App Router 引入 segment + 嵌套 layout，让布局、加载态、错误边界、状态保留都变成"沿路径层级推导"的结构化结果。

---

> 下一章：**第 3 章 React Server Components** —— RSC vs SSR、`'use client'` 边界、Server 组件限制、window 坑。本章的 `layout` 持久性、`loading`/`error` 边界，正是 RSC"服务端/客户端组件树"的容器，两章强衔接。
