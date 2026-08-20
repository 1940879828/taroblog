"use server"

// form 的 action 收到 FormData，返回处理结果（这里只是把用户输入回显 + 时间戳）。
// 注意：配合 useActionState 时，Server Action 签名是 (prevState, formData)。
type SubmitState = {
  ok: boolean
  error?: string
  name?: string
  message?: string
  receivedAt?: string
}

export async function submitMessage(
  _prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  const name = String(formData.get("name") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || !message) {
    return { ok: false, error: "姓名和内容都不能为空" }
  }

  // 真实场景：这里写数据库 / 发邮件 / 调内部 API
  return {
    ok: true,
    name,
    message,
    receivedAt: new Date().toISOString()
  }
}
