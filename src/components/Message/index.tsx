import FadeInOut from "@/components/FadeInOut/index"
import type React from "react"
import { useState } from "react"

// 消息的类型枚举
enum MessageType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info"
}

// 消息对象类型
type Message = {
  success: (message: string, options?: MessageOptions) => void
  error: (message: string, options?: MessageOptions) => void
  warning: (message: string, options?: MessageOptions) => void
  info: (message: string, options?: MessageOptions) => void
}

// 消息组件参数
type MessageProps = {
  id: string
  type: MessageType
  content: string
  onRemove?: (id: string) => void
  duration?: number
  justify?: "left" | "center" | "right"
}

type MessageOptions = Omit<MessageProps, "id" | "type" | "content">

// 消息组件
const MessageItem: React.FC<MessageProps> = (props) => {
  const { duration = 5000, justify = "left", type, id, onRemove } = props
  const [visible, setVisible] = useState(true)

  // 执行动画
  setTimeout(() => {
    setVisible(false)
  }, duration)

  // 动画执行完remove
  setTimeout(() => {
    onRemove?.(id)
  }, duration + 218)

  const Icon: React.JSX.Element = {
    success: <></>,
    error: <></>,
    warning: <></>,
    info: <></>
  }[type]

  const position = {
    left: "ml-0",
    center: "mx-auto",
    right: "ml-auto"
  }[justify]

  const from: MessageProps["justify"] = {
    left: "left",
    center: "up",
    right: "right"
  }[justify as keyof typeof from]

  const style = {
    error: "alert-error",
    warning: "alert-warning",
    info: "alert-info",
    success: "alert-success"
  }[type]

  return (
    <FadeInOut from={from} visible={visible} className={`w-fit ${position}`}>
      <div className={`flex gap-2 items-center alert ${style}`}>
        {Icon}
        {props.content}
      </div>
    </FadeInOut>
  )
}

// 消息对象
const message: Partial<Message> = {}
// 标识消息的ID
let incrementId = 0
// 消息列表对象
const messageList: { [key: string]: MessageProps } = {}
// 消息列表组件
export const MessageList = () => {
  const [flagId, setFlagId] = useState(0)
  const removeById = (id: string) => {
    delete messageList[id]
    setFlagId(flagId + 1)
  }
  const _message = (
    type: MessageType,
    content: string,
    options?: MessageOptions
  ) => {
    const id = `${++incrementId}`
    messageList[id] = {
      id: id,
      type: type,
      content: content,
      duration: options?.duration || 5000,
      justify: options?.justify || "left"
    }
    setFlagId(flagId + 1)
  }
  message.success = (content: string, options?: MessageOptions) => {
    _message(MessageType.Success, content, options)
  }
  message.error = (content: string, options?: MessageOptions) => {
    _message(MessageType.Error, content, options)
  }
  message.warning = (content: string, options?: MessageOptions) => {
    _message(MessageType.Warning, content, options)
  }
  message.info = (content: string, options?: MessageOptions) => {
    _message(MessageType.Info, content, options)
  }

  return (
    <div className="fixed top-0 right-0 left-0 pointer-events-none z-40">
      <div className="pt-4 pr-2 space-y-2">
        {Object.keys(messageList).map((key) => {
          const item = messageList[key]
          return <MessageItem key={item.id} {...item} onRemove={removeById} />
        })}
      </div>
    </div>
  )
}
export default message as Message
