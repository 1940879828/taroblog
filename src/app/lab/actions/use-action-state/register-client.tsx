"use client"

import { useActionState } from "react"
import { register } from "./actions"

type FormState = {
  ok: boolean
  errors?: { email?: string; password?: string }
  receivedAt?: string
}

const initialState: FormState = { ok: false }

export default function RegisterClient() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    register,
    initialState
  )

  return (
    <div className="space-y-4">
      <form
        action={formAction}
        className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4"
      >
        <div>
          <label htmlFor="reg-email" className="block text-xs text-slate-400">
            邮箱
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-400">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="reg-password"
            className="block text-xs text-slate-400"
          >
            密码
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            placeholder="至少 6 位"
            className="mt-1 w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-400">{state.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {isPending ? "校验中…" : "注册"}
        </button>
      </form>

      {state.ok && (
        <p className="rounded-lg border border-sky-500/40 bg-sky-500/10 p-3 text-sm text-sky-100">
          注册成功（服务端 {state.receivedAt}）
        </p>
      )}
    </div>
  )
}
