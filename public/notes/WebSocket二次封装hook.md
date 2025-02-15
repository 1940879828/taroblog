---
title: 封装ahooks的useWebSocket实现全局单例连接
date: 2025-02-14 17:55:40
tags: ['前端','React','WebSocket']
categories: ['前端','React实战']
---

## 背景说明

在实时数据推送场景（如即时聊天、实时监控）中，WebSocket 是比轮询更高效的解决方案。但原生 API 存在以下痛点：

- 多组件复用连接困难
- 消息格式不统一
- 状态管理复杂

通过二次封装 ahooks 的 `useWebSocket`，我们可以实现：

✅ 全局单例 WebSocket 连接  

✅ 自动 JSON 序列化  

✅ 统一错误处理  

✅ 便捷的状态获取

---

## 核心实现

### 1. 上下文定义

创建 WebSocket 上下文文件，定义类型和访问入口：

```tsx title="src/contexts/WebSocketContext.tsx"
import type { ReadyState } from "ahooks/es/useWebSocket"
import { createContext, useContext } from "react"

/**
 * WebSocket 上下文类型定义
 * 
 * @property sendMessage - 统一消息发送方法（自动序列化）
 * @property readyState - 连接状态（0-3对应不同状态）
 * @property lastMessage - 最新消息内容
 * @property webSocketIns - WebSocket 实例（谨慎操作）
 */
export interface WebSocketContext {
  sendMessage: (message: string | object) => void
  readyState: ReadyState
  lastMessage: MessageEvent<any> | null
  connect: () => void
  disconnect: () => void
  webSocketIns: WebSocket | null
}

// 创建上下文对象
export const WebSocketContext = createContext<WebSocketContext>({} as WebSocketContext)

// 便捷访问 Hook
export const useWebSocketContext = () => useContext(WebSocketContext)
```

### 2. Provider实现

实现全局状态管理组件：

```tsx 
import { WebSocketContext } from "@/contexts/WebSocketContext"
import { useWebSocketHeartbeat } from "@/hooks/useWebSocketHeartbeat"
import { useWebSocket } from "ahooks"
import type React from "react"
import { useEffect, useMemo } from "react"

const WS_URL = `${import.meta.env.VITE_WEB_SOCKET_BASE}`

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  // 基础功能从 ahooks 获取
  const {
    readyState,
    sendMessage: originalSend,
    connect,
    disconnect,
    latestMessage,
    webSocketIns
  } = useWebSocket(WS_URL, {
    reconnectLimit: 3,    // 失败后最大重试次数
    reconnectInterval: 3000, // 重试间隔（毫秒）
    manual: true          // 手动控制连接
  })

  // 增强发送方法：自动序列化对象
  const sendMessage = useMemo(() => {
    return (message: string | object) => {
      const payload = typeof message === "string" 
        ? message 
        : JSON.stringify(message)
      originalSend(payload)
    }
  }, [originalSend])

  // 初始化连接
  useEffect(() => {
    connect()
    return () => disconnect() // 组件卸载时断开
  }, [connect, disconnect])

  // 心跳检测（可选功能）
  const { handlePong } = useWebSocketHeartbeat({
    sendMessage,
    readyState,
    interval: 3000
  })

  // 消息处理器
  useEffect(() => {
    if (latestMessage?.data === 'pong') {
      handlePong() // 更新延迟数据
    }
  }, [latestMessage])

  // 上下文值整合
  const contextValue = useMemo(
    () => ({
      sendMessage,
      readyState,
      lastMessage: latestMessage || null,
      connect,
      disconnect,
      webSocketIns: webSocketIns || null
    }),
    [sendMessage, readyState, latestMessage, connect, disconnect]
  )

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  )
}
```

### 3. 组件使用示例

在子组件中消费上下文：

```tsx
import { useWebSocketContext } from "@/contexts/WebSocketContext"
import { useEffect } from "react"

const Send = () => {
  const { sendMessage, readyState, lastMessage } = useWebSocketContext()

  // 连接就绪时发送测试消息
  useEffect(() => {
    if (readyState === 1) { // OPEN 状态
      sendMessage("阿巴阿巴")
    }
  }, [readyState])

  // 监听消息变化
  useEffect(() => {
    console.log("收到新消息：", lastMessage)
  }, [lastMessage])

  return <div>WebSocket 测试组件</div>
}

export default Send
```

---

## 注意事项

⚠️ 实例操作规范
虽然我们通过 `webSocketIns` 暴露了原生实例，但直接调用其方法可能导致问题：

❌ 错误方式

```tsx
// 会覆盖 ahooks 的内部处理
webSocketIns.onmessage = () => {...} 
```

✅ 正确方式
```tsx
// 使用事件监听器避免冲突
webSocketIns?.addEventListener("message", (event) => {
  console.log("自定义消息处理", event)
})
```

---

## 进阶扩展：心跳检测

实现服务器延迟检测功能：

```tsx
import { useEffect, useRef } from 'react'
import { useSetAtom } from 'jotai'
import { serverPing } from '@/store/statusBar'

interface UseWebSocketHeartbeatOptions {
  sendMessage: (message: string | object) => void
  readyState: number
  interval?: number
}

/**
 * WebSocket 心跳检测 Hook
 * 
 * 实现原理：
 * 1. 定时发送 ping 消息
 * 2. 收到 pong 响应时计算延迟
 * 3. 更新全局状态
 */
export const useWebSocketHeartbeat = ({
  sendMessage,
  readyState,
  interval = 3000
}: UseWebSocketHeartbeatOptions) => {
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pingSentTimeRef = useRef<number | null>(null)
  const setServerPing = useSetAtom(serverPing)

  useEffect(() => {
    const shouldStart = readyState === WebSocket.OPEN
    
    const startPing = () => {
      if (!shouldStart) return
      
      pingIntervalRef.current = setInterval(() => {
        pingSentTimeRef.current = Date.now()
        sendMessage('ping')
      }, interval)
    }

    const stopPing = () => {
      pingIntervalRef.current && clearInterval(pingIntervalRef.current)
    }

    startPing()
    return () => stopPing()
  }, [readyState, sendMessage, interval])

  const handlePong = () => {
    if (pingSentTimeRef.current) {
      const latency = Date.now() - pingSentTimeRef.current
      setServerPing(`${latency}ms`)
    }
  }

  return { handlePong }
}
```