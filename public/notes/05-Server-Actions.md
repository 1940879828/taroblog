---
title: Next.js 面试 · Server Actions
tags: ['Next.js']
date: 2026-08-19 00:00:00
categories: ['前端','Next.js']
description: "Server Actions 原理：'use server' 是什么、与 API Route 的区别、<form action> 渐进增强、useActionState、事件处理器调用、revalidatePath 联动缓存。"
---

# 第 5 章 · Server Actions：`'use server'` 原理、与 API Route 区别、渐进增强

> 本章主线一句话：**Server Action 是"一个跑在服务端、却能像本地函数一样被客户端直接调用"的 async 函数——它消灭了"为了一个写操作去建 API Route + 客户端 fetch + 手动序列化 + 手动刷新"这一整条样板链，并天然与 RSC / 数据缓存联动。**

---

## 5.0 为什么需要 Server Actions（动机）

第 3、4 章讲了"服务端组件取数"和"缓存"。但一直有个缺口：**写操作怎么办？**

在传统写法里，客户端要改数据，得走一条完整链路：

```
客户端组件里 onChange / onClick
  → 手动 fetch("/api/xxx", { method: "POST", body: JSON.stringify(...) })
  → 服务端 route.ts 里解析 JSON、做业务、写数据库
  → 返回响应
  → 客户端再手动刷新数据 / 手动 router.refresh()
```

Server Actions 想解决的问题：**把这条链砍到最短，且让"写完后数据刷新"这件事由框架接管。**

> 记忆锚点：RSC 解决"读"（服务端组件直接取数），Server Actions 解决"写"（客户端直接调服务端函数）。两者都跑在服务端，一个负责渲染，一个负责动作。

---

## 5.1 什么是 Server Action：一句话 + 最小形态

**Server Action = 一个标了 `'use server'` 的 async 函数，可以被客户端直接调用。**

```ts
// actions.ts —— 用 "use server" 声明这是一个 Server Action 模块
"use server"

export async function createTodo(text: string) {
  // 这里可以写数据库 / 调内部 API / 持有密钥
  console.log("服务端创建了 todo:", text)
}
```

客户端组件像调本地函数一样调用它：

```tsx
"use client"
import { createTodo } from "./actions"

export function AddButton() {
  return <button onClick={() => createTodo("买牛奶")}>新增</button>
}
```

**关键点**：
- `'use server'` 标注的文件里导出的函数，都被标记为 Server Action（服务端函数）。
- 客户端调用时，框架自动把它转换成一次 **POST 请求**（协议细节对你透明）。
- 返回的值会被序列化回传给客户端（类似 RSC payload，需要可序列化）。

---

## 5.2 `'use server'` 的两种写法（面试常考）

| 写法 | 位置 | 特点 |
|---|---|---|
| **单独文件**（推荐） | `"use server"` 在文件顶部 | 文件里所有导出都是 Server Action，便于复用 |
| **内联** | 在 Server Component 里用 `async function` 直接传给客户端组件 | 一个函数只服务一个组件，写法就近 |

**内联示例**（Server Component 里定义，作为 props 传给客户端组件）：

```tsx
// Server Component
export default function Page() {
  async function handleSubmit(formData: FormData) {
    "use server" // 让这个函数变成 Server Action
    await db.post.create({ title: formData.get("title") })
  }
  return <ClientForm onSubmit={handleSubmit} />
}
```

> 注意：`"use server"` 不能出现在**客户端组件**（`'use client'`）内部——Server Action 必须定义在服务端能访问的位置。

---

## 5.3 Server Action vs API Route：到底差在哪（本章最常考）

| 维度 | Server Action | API Route（`route.ts`） |
|---|---|---|
| 本质 | 一个函数 | 一个 HTTP 端点 |
| 客户端怎么调 | 像调本地函数 | 手动 `fetch("/api/xxx")` |
| 需要定义文件 | 一个 `"use server"` 函数 | 一个 `route.ts` + 请求解析 |
| 序列化 | 自动 | 手动 `JSON.stringify` / `request.json()` |
| 能否直接访问数据库/密钥 | ✅ 直接在函数里用 | ✅ 也可以 |
| 渐进增强（无 JS） | ✅ `<form action>` 天然支持 | ❌ 必须 JS fetch |
| 联动缓存 | ✅ 天然可调 `revalidatePath` / `revalidateTag` | ✅ 也能调，但更绕 |
| 暴露给外部 | ❌ 不能被非 Next 客户端调用 | ✅ 是标准 HTTP 接口，任何客户端可调 |

**选择结论（面试直接答）**：
- 表单提交 / 组件内部动作 / 需要联动缓存 → **Server Action**。
- 需要**第三方、移动端、非 Next 客户端**调用的公开接口，或要精细控制 HTTP 语义 → **API Route**。

> 一句话：**Server Action 是"给自家 React 组件用"的函数，API Route 是"给全世界用"的接口。**

---

## 5.3b 什么场景、为什么要用 Server Action（判断依据）

**先说一个关键前提：Server Action 不是"万能转发层"，也不是"全项目统一风格"。** 老后端已有的成熟能力，直接让客户端调老后端即可——Server Action 只在"它帮前端做了额外的事"时才值得用。

**判断标准（每次问自己）：Server Action 帮前端省了什么、做了老后端之外的事吗？没有就不需要。**

| 场景 | 用不用 Server Action | 原因 |
|---|---|---|
| 老后端接口已完成，客户端直接 fetch 即可 | ❌ 不用 | 纯透传 = 多一层、多一次跳转、多一分延迟，没收益 |
| 需要"写操作后联动页面缓存、刷新某块 UI" | ✅ 用 | 能"写数据 + revalidatePath + router.refresh"一步到位 |
| 需要聚合多个老后端接口成一个页面需求 | ✅ 用 | 服务端聚合，减少往返、少写客户端拼装 |
| 需要隐藏服务端才有的密钥 / 内部地址 | ✅ 用 | 转发老后端但藏住敏感信息，不暴露给浏览器 |
| 表单提交，且需要渐进增强（无 JS 也能提交） | ✅ 用 | `<form action>` 天然支持 |
| 要给第三方 / 移动端 / 非 Next 客户端调 | ❌ 用 API Route | Server Action 不能暴露给外部 |

### 重点展开：为什么"写操作后联动缓存/刷新 UI"值得用 Server Action

这类场景的关键难点是：**数据可能被四层缓存了，或在多处展示。** 光"写进去"不够，还得让"看到旧数据的地方"失效并重新渲染。

```
1. Server Action 里写操作（调老后端 / 直接落库）
2. Server Action 里 revalidatePath / revalidateTag → 清掉相关页面缓存
3. 客户端 router.refresh() → 让当前页重新拉 RSC，UI 立刻更新
```

三步**必须在一起**，才能"改完立刻看到新数据、且数据来自服务端"：

```ts
"use server"
import { revalidatePath } from "next/cache"

export async function addComment(formData: FormData) {
  const text = String(formData.get("text") ?? "")
  // 1. 写操作（可调老后端成熟接口）
  await fetch("https://老后端/api/comments", { method: "POST", body: JSON.stringify({ text }) })
  // 2. 联动：让显示评论区的页面缓存失效
  revalidatePath("/post/xxx")
}
```

```tsx
"use client"
// 提交后：服务端写数据 + 清缓存 → 客户端刷新 → 评论区立刻出现新评论
await addComment(formData)
router.refresh()
```

**对比不用 Server Action（只客户端 fetch）：** 评论写进去了，但页面还显示旧列表（有缓存）；数据在多个地方展示时，还要手动一个个地方刷新。Server Action 的 `revalidatePath` + `router.refresh()` 一次搞定"写数据 → 清缓存 → 整块重新渲染"。

> 什么时候其实不用这么做？如果页面**完全没缓存、数据只显示在本地一处、纯客户端状态**，用客户端 fetch + 本地 `setState` 也够。Server Action 的价值集中在"**有缓存要失效 / 数据在多处 / 想保持服务端数据权威**"时。

---

## 5.4 三种调用方式（实验区落地）

### 1. `<form action={serverAction}>` —— 渐进增强（最重要）

把 Server Action 直接塞进 `<form action>`，**不需要 JS 也能提交**（渐进增强的核心）：

```tsx
// actions.ts
"use server"
export async function submit(formData: FormData) {
  const name = formData.get("name")
  // ...写数据库
}
```

```tsx
// 客户端或服务端组件都能用 <form action>
<form action={submit}>
  <input name="name" />
  <button>提交</button>
</form>
```

- 提交时浏览器自动把表单字段组装成 `FormData` 传给 Server Action。
- 无 JS：浏览器原生提交；有 JS：Next 接管，无整页刷新。

### 2. `useActionState` —— 拿到状态、pending、返回值

`<form action>` 本身拿不到"提交中""成功/失败"状态。用 React 19 的 `useActionState`：

```tsx
"use client"
import { useActionState } from "react"
import { submit } from "./actions"

const [state, formAction, isPending] = useActionState(submit, initialState)

// state:     action 的返回值（可含错误/成功信息）
// formAction: 传给 <form action={formAction}>
// isPending: 执行期间为 true，用于禁用按钮 / 显示 loading
```

> 关键点：`useActionState` 里 action 的签名是 **`(prevState, formData) => newState`**——第一个参数是上一次的状态，所以校验失败能"返回错误并回显"，不依赖任何客户端状态库。

### 3. 事件处理器里直接调用（`onClick` 等）

非表单场景，直接在事件里 `await`：

```tsx
"use client"
const data = await someServerAction()  // 像调本地 async 函数
```

> 注意：事件处理器方式**没有渐进增强**（必须 JS 运行才能触发）；需要"无 JS 可用"的场景用 `<form action>`。

---

## 5.5 校验与错误处理（最佳实践）

Server Action 的"校验发生在服务端"是它的安全优势——**不要只依赖客户端校验**（可被绕过）。

```ts
"use server"
export async function register(_prev: RegisterState, formData: FormData) {
  const email = formData.get("email")?.toString().trim()

  if (!email?.includes("@")) {
    // 返回错误对象，客户端 useActionState 回显
    return { ok: false, errors: { email: "邮箱格式不正确" } }
  }
  // 通过校验后写数据库…
  return { ok: true }
}
```

**安全要点（面试加分）**：
- **Server Action 也暴露在网络上**（本质是 POST 端点），所以**必须自己做鉴权/权限校验**，不能假设"只有我的组件能调它"。
- 用 `cookies()` / `headers()` 识别用户，做"是否有权执行此操作"的判断。
- 校验放服务端，客户端校验只是体验优化。

---

## 5.6 Server Action 与缓存联动（承接第 4 章）

Server Action 是"既能写数据、又能让缓存失效"的地方：

```ts
"use server"
import { revalidatePath } from "next/cache"

export async function createPost() {
  await db.post.create(...)        // 1. 写数据
  revalidatePath("/blog")          // 2. 让 /blog 的数据缓存 + 完整路由缓存失效
}
```

客户端调用后，还要 `router.refresh()` 刷新**路由器缓存**：

```tsx
"use client"
import { useRouter } from "next/navigation"
import { createPost } from "./actions"

const router = useRouter()
await createPost()   // 服务端：写数据 + revalidatePath 清缓存
router.refresh()     // 客户端：刷新路由器缓存，让当前页重新拉 RSC
```

三层缓存怎么失效（回看第 4 章 4.6 总表）：
| 动作 | 数据缓存 | 完整路由缓存 | 路由器缓存 |
|---|---|---|---|
| Action 里 `revalidatePath` / `revalidateTag` | 清 | 清 | 清 |
| 客户端 `router.refresh()` | 不动 | 不动 | 清 |

> 记忆锚点：**写数据 → `revalidatePath`（服务端清缓存）→ `router.refresh()`（客户端刷新视图）**，三者配合才能"改完立刻看到新数据"。

---

## 5.7 Server Actions 的限制（边界）

- **返回值必须可序列化**：不能返回函数、`Date`（会被转字符串）、循环引用等。
- **参数必须可序列化**：通常传简单值 / `FormData`；复杂对象需能被序列化。
- **不能用在客户端组件内定义**：`"use server"` 只能在服务端可访问的位置。
- **有请求体大小限制**：Server Action 走 POST，大文件上传不适合，用 `route.ts` / 上传服务。
- **生产环境建议做鉴权**：见 5.5。

---

## 5.8 代码实验

位置：`src/app/lab/actions/`，入口 [/lab/actions](/lab/actions)。

| 实验 | 目录 | 验证目标 |
|---|---|---|
| form 的 action | `form-basic/`（`<form action>` + `useActionState`） | 提交不用 fetch、渐进增强、拿到结果 |
| useActionState 状态 | `use-action-state/`（pending + 校验回显） | 提交中 loading、服务端校验错误回显到输入框 |
| 事件处理器调用 | `event-handler/`（onClick 直接 `await`） | 非表单场景像调本地函数 |
| Server Action vs API Route | `vs-api-route/`（同一操作两种实现） | 对比写法、序列化、请求来源 |
| Action 里 revalidatePath | `with-revalidate/`（Action + `revalidatePath`） | 写操作后数据立刻更新（联动缓存） |

**观察方法**：
- `pnpm dev`：提交表单、点按钮，看返回值与 loading 状态。
- `vs-api-route`：Network 面板看两边请求的差异（`/api/echo` 是普通 POST fetch；Server Action 是内部协议 POST）。
- `with-revalidate`：先记下"当前值"，点"模拟写入后刷新" → 值变化（`revalidatePath` 清了缓存）。
- 想验证渐进增强：浏览器禁用 JS 后提交 `<form action>` 表单，仍能触发服务端处理。

---

## 5.9 面试自测题

<details>
<summary>1. 什么是 Server Action？它解决了什么问题？</summary>

Server Action 是标了 'use server' 的 async 函数，能被客户端像本地函数一样调用。它解决"写操作"的样板链问题：不用建 API Route、不用客户端 fetch + JSON 序列化 + 手动刷新，且天然与 RSC / 缓存联动。
</details>

<details>
<summary>2. 'use server' 和 'use client' 的区别？</summary>

'use server' 声明"这是服务端函数"（Server Action），'use client' 声明"这是客户端组件边界"。一个管"动作/函数"，一个管"组件/渲染"，两者可组合：客户端组件里可以调用 Server Action。
</details>

<details>
<summary>3. Server Action 和 API Route 的区别？什么时候用哪个？</summary>

Server Action 是给自家 React 组件用的函数（像调本地函数、自动序列化、天然渐进增强、联动缓存）；API Route 是标准 HTTP 接口（任何客户端可调、可精细控制 HTTP）。表单/组件动作/需要联动缓存 → Server Action；第三方/移动端/公开接口 → API Route。
</details>

<details>
<summary>4. 渐进增强是什么意思？Server Action 怎么实现的？</summary>

渐进增强 = 无 JS 也能用核心功能。`<form action={serverAction}>` 时，无 JS 浏览器会原生提交表单（FormData 传给服务端函数），有 JS 时 Next 接管做无刷新提交。所以 Server Action 天然支持渐进增强。
</details>

<details>
<summary>5. useActionState 是做什么的？action 签名为什么有 prevState？</summary>

useActionState 绑定 `<form action>`，返回 [state, formAction, isPending]。state 是 action 返回值，isPending 标记提交中。action 签名是 (prevState, formData) => newState，第一个参数是上一次状态，这样校验失败能"返回错误回显"，无需客户端状态库。
</details>

<details>
<summary>6. 为什么说 Server Action 的校验必须在服务端做？</summary>

Server Action 本质是暴露在网络上的 POST 端点，任何客户端都能调（不只你的组件）。所以必须服务端校验 + 鉴权（用 cookies/headers 识别用户），客户端校验只是体验优化，可被绕过。
</details>

<details>
<summary>7. Server Action 写完数据后，怎么让页面立刻更新？</summary>

三步：① Action 里写数据；② Action 里调 revalidatePath/revalidateTag 清数据缓存+完整路由缓存；③ 客户端 router.refresh() 刷新路由器缓存。三者配合才能立刻看到新数据。
</details>

<details>
<summary>8. Server Action 有哪些限制？</summary>

参数和返回值必须可序列化（不能传函数、Date 等）；不能在客户端组件内定义 'use server'；请求体大小有限制（大文件用 route.ts）；生产必须做鉴权。
</details>

<details>
<summary>9. 三种调用 Server Action 的方式？各有什么特点？</summary>

① `<form action>`：渐进增强，无 JS 也能提交；② useActionState：拿到状态/pending/返回值，适合带校验的表单；③ 事件处理器 await：非表单场景直接调，但无渐进增强。
</details>

<details>
<summary>10. Server Action 和 RSC 是什么关系？</summary>

RSC（'use server' 语义下的 Server Component）是"服务端组件"，负责渲染；Server Actions（'use server' 函数）是"服务端函数"，负责动作。一个管读/渲染，一个管写/动作，都跑在服务端，是 RSC 架构的两个互补部分。
</details>

---

## 5.10 常见追问（加分项）

- **"Server Action 是不是就是 RSC 的一种？"**：不是。RSC 指组件（Server Component），Server Actions 指函数（'use server'）。两者都基于"代码留在服务端"的同一理念，但一个是渲染、一个是动作。
- **"客户端能直接 import 并调用 Server Action，为什么不直接暴露数据库？"**：不能。Server Action 是受控的函数，内部可以校验、鉴权、封装权限；直接暴露数据库才是不安全。框架仍会做序列化和网络传输，不是"数据库直连"。
- **"为什么 Server Action 返回值不能是函数？"**：因为返回值要序列化后跨网络传给客户端（类似 RSC payload），函数无法序列化。
- **"无 JS 时 useActionState 还能用吗？"**：useActionState 需要 JS 才能拿到 isPending 和回显；但 `<form action>` 本身无 JS 也能提交（渐进增强），只是看不到 pending 状态。两者分开理解。
- **"一个 Server Action 能调另一个吗？能调用私有 API 吗？"**：能。Server Action 是服务端函数，可以直接调数据库、内部 API、其他服务端函数（只要它们在服务端上下文），且这些调用不会暴露给浏览器。
- **"revalidateTag 在 Server Action 里和 Route Handler 里有什么不同？"**：Server Action 里调用会**同时清路由器缓存**（因为绑定当前路由），Route Handler 里调用只清数据缓存（不绑定具体路由），客户端还要 router.refresh 才能看到（回看第 4 章 4.10）。

---

## 5.11 架构视角：Next 后端承载什么

前面讲了 Server Action / API Route 单个能力的选型，这里放大到宏观：**Next 的"后端部分"到底承载什么？** 一句话定位：**Next 后端是"贴近页面的那层逻辑"（BFF / 鉴权 / 缓存 / 薄写操作），而不是替代 Java / Python 的核心后端。**

```
浏览器
  ↓
Next（前端渲染 + 薄后端 = BFF 层）
  ├─ 鉴权 / 会话 / 路由守卫        （middleware + cookies/headers）
  ├─ 页面数据聚合 + 缓存            （服务端组件 fetch / unstable_cache）
  ├─ 表单 / 写操作薄处理            （Server Action + 校验 + revalidate）
  ├─ 轻量 API / 代理转发            （Route Handlers）
  └─ SEO 元数据 / SSR 逻辑          （generateMetadata / generateStaticParams）
      ↓ 内部 fetch（服务器间对接）
Java 微服务（核心业务 / 事务 / 数据）
Python 服务（计算 / 算法 / ML）
```

**Next 后端主流承载的功能（按重要程度排）：**

1. **BFF：面向页面聚合数据**——页面需要的数据分散在多个后端接口，服务端组件直接并行 `fetch` 聚合，减少往返、少写客户端拼装逻辑。
2. **页面级数据获取 + 缓存**——服务端组件 `fetch` / `unstable_cache` 缓存、ISR/SSG 静态化、`revalidateTag`/`revalidatePath` 控制失效。
3. **表单提交 / 写操作薄处理**——Server Action 做校验 + 鉴权 + 写操作，内部再调老后端或直接落库，配合 `revalidatePath` 刷新页面。
4. **鉴权与会话**——`middleware.ts` 路由守卫、`cookies()`/`headers()` 识别用户、集成 OAuth / Auth.js。
5. **轻量 API / 代理转发**——站点内专用接口、透传隐藏老后端内部地址。
6. **服务端渲染特有逻辑**——`generateMetadata` / `generateStaticParams`（SEO）、渲染前权限判断、国际化/主题等 SSR 配置。

**明确"不该"由 Next 承载：**

- 核心业务逻辑（订单状态机、库存、事务）→ 留 Java 微服务。
- 计算 / 算法 / ML → 留 Python。
- 大规模数据处理 / 消息队列 / 定时任务重活 → 留给专业后端。
- 需要独立扩容的高并发纯 API → 独立后端更合适。

> 一句话总结：**Next 后端 = 页面服务的"接线员"（BFF / 鉴权 / 缓存 / 薄写操作），不是"核心后端"（Java / Python 干重型活）。** 它做的是"把后端能力聚合给页面"，核心业务与重计算仍是 Java / Python 的职责。

---

> 下一章：**第 6 章 性能 / 部署 / 工程化** —— `next/image`、流式渲染、`next build`、Next 16 新特性。本章的"写操作 + 缓存联动"会在工程化章节落到真实的性能与部署考量上。
