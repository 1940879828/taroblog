# AGENTS.md — taroblog 项目说明

本文件是给 AI 编程助手（以及人类协作者）的长期项目说明。开始任何改动前先读这里。

## 项目概览

- 名称：taroblog
- 类型：个人博客 / 技术笔记站点，Next.js App Router 项目。
- 核心依赖：Next.js 16.1.7、React 19.2.4、TypeScript 5、Tailwind CSS 4、daisyUI 5、jotai（状态）、react-markdown（Markdown 渲染）、Konva / react-konva（画布路线图）。
- 启用了 React Compiler（`next.config.ts` 中 `reactCompiler: true`），代码须保持可被编译器安全分析。
- 包管理器：pnpm（存在 `pnpm-workspace.yaml` 与 `pnpm-lock.yaml`），也保留 npm scripts。

## 目录约定

- `src/app/`：App Router 页面与 API 路由。路由分组：
  - `(nav)`：带导航栏的页面（首页、笔记、分类、标签、友链）。
  - `(noNav)`：无导航栏的页面（history、test）。
  - `lab/`：渲染模式实验页（CSR / SSG / SSR / ISR / Hydration）。
- `src/components/`：UI 组件。每个组件通常一个目录，入口为 `index.tsx`，样式用 CSS Module（`index.module.css`）。
- `src/hooks/`：自定义 hooks。
- `src/lib/`：纯工具函数（markdown、note、utils、drawRoadmap 等）。
- `src/config/`：站点静态配置（navbar、friend、roadMap）。
- `src/store/`：jotai 全局状态。
- `src/actions/`：Server Actions。
- `src/proxy.ts`：代理相关。
- 根目录 `patches/`：`patch-package` 补丁（当前有 `ahooks` 补丁），改动依赖时注意。

## 开发约定

- 使用 pnpm 安装依赖：`pnpm install`。postinstall 会自动执行 `patch-package`。
- 换行符统一 LF，由 `.gitattributes` 强制（源码、json、md、css 等均 `eol=lf`），Windows 下注意不要引入 CRLF。
- 图片使用 `next/image`，远程图片域名需在 `next.config.ts` 的 `images.remotePatterns` 中登记；当前已禁用图片优化（`unoptimized: true`）。

## 修改前检查

- 先阅读本文件并按约定执行。
- 开始编辑前确认当前任务相关文件、调用方和测试。
- 编辑前检查 `git status`，区分用户已有改动与本次改动，避免混入无关内容。
- 设计函数时默认不超过 20 行、参数不超过 3 个。
- 完成后至少运行 `npm run typecheck`。注意：本仓库 `package.json` 目前**未定义** `typecheck` script，请使用等价命令 `npx tsc --noEmit` 做类型检查（`tsconfig.json` 已开启 `noEmit`）。

## 代码风格守则

- 使用 Biome 做 lint 与格式化：`npm run lint`（等价 `npx @biomejs/biome check --write --unsafe`），提交前执行。
- 组件采用函数组件 + hooks，不引入 class 组件。
- 样式优先 Tailwind 原子类 + CSS Module，避免散落的内联样式。
- 类型优先使用 TypeScript 推断，避免冗余显式标注。

## 第一性原理

遇到需求冲突、方案分歧、或要分析复杂需求时，回到第一性原理：

- 抛开“惯例就这么做”“上次那样做的”，先问这件事的根本目标和真实约束是什么。
- 把问题拆到不可再拆的事实层，再从事实重新推导方案，而不是类比套用现成答案。
- 冲突时先对齐双方真正要的底层目标——冲突往往只在表层，底层目标常可调和。

## 禁止症状遮蔽式工程

从第一性原理出发。遇到加载慢、白屏、闪烁、状态错乱、异步竞态、生命周期错位、偶现失败等问题时，禁止把延迟、截图遮盖、假 loading、静默吞错、无限重试、强制刷新、缓存旧画面等手段当作根因修复。

判断标准：

- 必须先解释真实因果链：哪个状态未就绪、哪个依赖缺失、哪个边界没有建模、哪个链路变慢或失败。
- 修复方案必须优先消除根因，而不是只降低用户感知或让异常变得不可见。
- 如果引入 `delay`、`asyncAfter`、`postDelayed`、截图占位、遮罩、额外 loading、吞错、重试、强刷等机制，提交前必须回答：这是根因修复还是症状遮蔽？
- 临时止血可以接受，但必须显式标注为 temporary mitigation，并写明退出条件、验证方式和后续根因修复任务；不得把止血包装成最终方案。

## 代码审查守则

- 关注 SSR / CSR 边界：区分服务端组件与客户端组件（`"use client"`），避免把浏览器 API 用在服务端导致 hydration 错误。
- 关注 React Compiler 兼容性：避免编译器无法静态分析的写法（如对 props/state 的原地可变修改）。
- 关注类型正确性：以 `npx tsc --noEmit` 通过为准。
- 关注副作用与竞态：异步数据、动画、事件监听需处理清理与卸载时机。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm install` | 安装依赖（自动跑 patch-package） |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建（postbuild 执行 next-sitemap） |
| `pnpm start` | 启动生产服务器 |
| `pnpm lint` | Biome lint + 格式化（`--write --unsafe`） |
| `npx tsc --noEmit` | 类型检查（package.json 未定义 typecheck script） |

## 本机环境与工具

以下为已验证、对本项目有用的稳定环境信息。

- OS：Windows，Shell 为 PowerShell 5.1。
- Node：v22.22.2（路径 `D:\nodejs\node.exe`）。
- npm：10.9.7；pnpm：11.0.9（本项目包管理器）。
- git：2.54.0.windows.1；gh：2.93.0。
- TypeScript（tsc）：5.9.3。
- 换行：`.gitattributes` 强制源码与文档 LF，Windows 下需注意。

如后续某工具调用失败，先排查并修复本机工具配置，修复后同步更新本节。

## Git 注意事项

- 提交信息用 `类型: 中文描述` 的简式风格，历史类型含 `feat` / `fix` / `perf` / `update` / `delete`。
- 提交前用 `git status` 与 `git diff` 自审，确保只包含本次改动。
- 不提交依赖锁文件之外的多余产物；`patches/` 下的补丁如变化需一并提交。

## 提交代码时

1. 完成改动后运行 `npx tsc --noEmit` 与 `pnpm lint`，确保类型与格式通过。
2. `git status` / `git diff` 复核改动范围。
3. 提交信息遵循 `feat: ...` / `fix: ...` 等前缀 + 中文描述。
4. 涉及补丁、依赖锁文件、远程图片域名等配置变更时，确认相关文件一并纳入。

## 安全与敏感信息

- 不得在仓库中提交任何密钥、token、完整环境变量或内部工具 schema。
- 涉及代理（`src/proxy.ts`）、远程资源域名、私有 IP 等配置时，避免把本机/内网敏感地址硬编码进可提交代码。
- 提交前检查 diff，确认没有误带入凭据或本机绝对路径。
