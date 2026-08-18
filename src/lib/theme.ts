export const VALID_THEMES = ["cupcake", "dark"] as const

export type Theme = (typeof VALID_THEMES)[number]

export const DEFAULT_THEME: Theme = "cupcake"

export function isTheme(value: unknown): value is Theme {
  return (
    typeof value === "string" &&
    VALID_THEMES.includes(value as (typeof VALID_THEMES)[number])
  )
}
