"use client"

import { useActionState } from "react"
import { submitMessage } from "./actions"

type SubmitResult = {
  ok: boolean
  error?: string
  name?: string
  message?: string
  receivedAt?: string
}

const initialState: SubmitResult = { ok: false }

export default function FormBasicClient() {
  // useActionState(action, initialState)：返回 [state, formAction, pending]
  const [state, formAction, isPending] = useActionState<SubmitResult, FormData>(
    submitMessage,
    initialState
  )

  return (
    <div className="space-y-4">
      <form
        action={formAction}
        className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4"
      >
        <div>
          <label htmlFor="fb-name" className="block text-xs text-slate-400">
            姓名
          </label>
          <input
            id="fb-name"
            name="name"
            type="text"
            placeholder="你的名字"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="fb-message" className="block text-xs text-slate-400">
            内容
          </label>
          <textarea
            id="fb-message"
            name="message"
            rows={3}
            placeholder="说点什么…"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {isPending ? "提交中…" : "提交"}
        </button>
      </form>

      {state.ok && (
        <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4 text-sm leading-6 text-sky-100">
          <p className="font-semibold">服务端已收到</p>
          <p className="mt-1">
            <span className="text-sky-300">{state.name}</span>：{state.message}
          </p>
          <p className="mt-1 text-xs text-sky-100/70">
            服务端处理时间：{state.receivedAt}
          </p>
        </div>
      )}

      {!state.ok && state.error && (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {state.error}
        </p>
      )}
    </div>
  )
}
