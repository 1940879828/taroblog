import { PageHeader } from "../../_components"
import RegisterClient from "./register-client"

export default function UseActionStatePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        no="05 · 实验 B"
        title="useActionState：pending 与校验回显"
        desc="useActionState 不止绑定表单，还能拿到 pending（提交中）状态、服务端返回的校验错误，并回显到对应输入框。"
      />

      <RegisterClient />

      <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-200">
        <p className="font-semibold">关键认知</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          <li>
            <code>
              const [state, formAction, isPending] = useActionState(action,
              initialState)
            </code>
          </li>
          <li>
            <code>state</code> 是 action 的返回值；<code>isPending</code> 在
            action 执行期间为
            <code>true</code>，用于禁用按钮 / 显示 loading。
          </li>
          <li>
            action 的第一个参数是<strong>上一次的 state</strong>（
            <code>prevState</code>
            ），所以校验失败可以返回错误、再回显——不用依赖任何客户端状态库。
          </li>
        </ul>
      </div>
    </div>
  )
}
