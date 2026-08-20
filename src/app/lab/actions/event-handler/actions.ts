"use server"

// Server Action 也可以直接在事件处理器（onClick 等）里 await 调用。
// 但注意：事件处理器方式**没有渐进增强**——必须 JS 运行才能触发。
export async function fetchServerTime() {
  return {
    serverTime: new Date().toISOString(),
    source: "Server Action（onClick 直接调用）"
  }
}
