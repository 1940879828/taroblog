---
title: 前端在区块链中扮演的角色
date: 2024-09-19 21:59:25
tags: 'Web3'
categories: 'Web3'
---

本文讨论一下前端在区块链中起什么作用，我觉得前端主要还是扮演的交互角色，在web端、在移动端，调用库和接口对区块链上的数据进行操作，那么具体是调用哪些库呢？



Wagmi、Viem 和 Web3Modal 是在 Web3 开发中常用的工具库，主要用于构建与区块链交互的前端应用。它们分别解决了区块链交互、RPC 通信、和钱包连接的不同问题，但可以组合起来构建更强大、用户体验更好的 DApp。

### 1. **Wagmi**

Wagmi 是一个用于 React 应用的前端库，简化了与以太坊和其他 EVM 兼容区块链的交互。它提供了一套 React hooks，使得钱包连接、账户信息获取、区块链读写操作等功能变得非常方便。Wagmi 的核心设计理念是“易用”和“高可定制性”，并且支持与多种钱包和 RPC 库的无缝集成。

**主要特点：**

- React hooks 简化区块链交互
- 内置状态管理和错误处理
- 与多种钱包无缝集成
- 支持合约读写、监听事件等

### 2. **Viem**

Viem 是一个现代化的以太坊 JavaScript 库，用于与区块链节点（如 RPC 节点）进行通信。它可以被视为 ethers.js 的替代品，提供了类似功能，如处理交易、合约调用、账户和区块信息等。Viem 设计现代、类型安全且高度模块化，尤其适合 TypeScript 项目，并且与 Wagmi 兼容良好。

**主要特点：**

- 高性能的 RPC 调用
- 类型安全，适合 TypeScript
- 支持与多链交互
- 兼容 Wagmi 以及其他前端框架

### 3. **Web3Modal**

Web3Modal 是一个钱包连接库，允许 DApp 简单地集成各种加密钱包。它提供了一个统一的接口，用户可以通过一个弹出窗口选择他们想要连接的加密钱包，比如 MetaMask、WalletConnect、Coinbase Wallet 等。Web3Modal 可以与 Wagmi 结合使用，管理用户的账户连接和身份认证。

**主要特点：**

- 支持多个钱包（如 MetaMask、WalletConnect、Coinbase Wallet）
- 用户体验良好的钱包连接界面
- 易于集成并与 React 和其他前端框架兼容

### 关系与组合使用

Wagmi、Viem 和 Web3Modal 可以无缝协作，共同构建一个完整的区块链前端交互系统。

1. **钱包连接：**通过 Web3Modal 用户可以选择并连接钱包。
2. **账户管理：**钱包连接后，Wagmi 负责管理账户、交易等状态，并提供 React hooks。
3. **区块链交互：**Viem 通过与区块链节点的 RPC 通信，执行合约调用、读取链上数据等操作。Wagmi 的 hooks 也可以依赖 Viem 来进行更深度的区块链交互。

**典型使用场景**：

- 使用 Web3Modal 提供钱包选择 UI，用户连接钱包。
- Wagmi 处理账户连接状态，并使用 React hooks 来获取用户的地址、余额等信息。
- Viem 用于处理具体的区块链读写操作，如发送交易或调用智能合约。



### **具体使用（在前端使用web3model链接钱包）**：

我使用的是react，参考官方文档：[Installation | Reown Docs](https://docs.reown.com/appkit/react/core/installation)



项目地址：[1940879828/learnWeb3: A web3 practice project about the front end (github.com)](https://github.com/1940879828/learnWeb3)



1. 安装包

```json
npm install @reown/appkit @reown/appkit-adapter-wagmi wagmi viem @tanstack/react-query
```



2. 获取project Id

钱包和前端应用会通过 Web3 RPC（Remote Procedure Call）协议进行通信。服务提供商通过标准化的 API，帮助应用与钱包之间交换数据，比如发起交易请求、签名交易等。



所以我们需要在服务商中注册，并获取project id作为参数。



注册地址：[Projects - Reown](https://cloud.reown.com/app/a41304a0-b3d5-483d-96b7-4ac3877f36d6)



注册一个App kit类型的项目并获取他的Project id，打开`Dashboard - 你的project`中也有简单的入门引导



2. 编辑文件`App.tsx`

```tsx
import './App.css'
import {Outlet} from "react-router-dom";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 仅仅是链接钱包不需要queryClient，具体可以参考包@tanstack/react-query的使用文档
const queryClient = new QueryClient()

// reown获取到的项目id
const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

// 应用可以连接的区块链 
const chains = [mainnet, arbitrum, sepolia] as const

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'myWeb3LearnProject',
    description: 'AppKit Example',
    // 托管项目的网站链接
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
})

createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: false // Optional - false as default
})

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      {/* 不使用tanstack/react-query的话这个QueryClientProvider高阶组件是不必要的 */}
      <QueryClientProvider client={queryClient}>
        <w3m-button />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
```

> tanstack/react-query的文档：[TanStack Query](https://tanstack.com/query/latest)
>
> - 一个用于管理 React 应用中**服务端数据获取、缓存、同步和更新**的库
