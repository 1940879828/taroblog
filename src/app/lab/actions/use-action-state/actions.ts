"use server"

import { setTimeout as sleep } from "node:timers/promises"

type FormState = {
  ok: boolean
  errors?: { email?: string; password?: string }
  receivedAt?: string
}

// 模拟一个带服务端校验的注册表单：
// - 校验失败 → 返回 errors，客户端回显到对应输入框下
// - 校验通过 → 模拟写入（真实场景写数据库），返回成功
export async function register(_prevState: FormState, formData: FormData) {
  // 模拟网络/数据库延迟，让 pending 状态可感知
  await sleep(800)

  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  const errors: FormState["errors"] = {}
  if (!email.includes("@")) errors.email = "邮箱格式不正确"
  if (password.length < 6) errors.password = "密码至少 6 位"

  if (Object.keys(errors).length > 0) {
    // prevState 由 useActionState 传入（上一次的状态），这里返回校验失败
    return { ok: false, errors }
  }

  return { ok: true, receivedAt: new Date().toISOString() }
}
