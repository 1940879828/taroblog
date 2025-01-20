import { cn } from "@/lib/utils"
import type React from "react"
import type { PropsWithChildren, ReactNode } from "react"

interface SwapOnProps extends PropsWithChildren {
  className?: string
}

export const SwapOn = ({ className, children }: SwapOnProps) => {
  return <div className={cn("swap-on", className)}>{children}</div>
}

interface SwapOffProps extends PropsWithChildren {
  className?: string
}

export const SwapOff = ({ className, children }: SwapOffProps) => {
  return <div className={cn("swap-off", className)}>{children}</div>
}

interface RotateSwapProps {
  onChange?: (value: boolean) => void
  variant?: "rotate" | "flip"
  children?: ReactNode
  defaultValue?: boolean
  checked?: boolean
}

export const Swap = ({
  variant = "rotate",
  defaultValue = false,
  checked,
  children,
  onChange
}: RotateSwapProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked)
  }

  return (
    <label className={`swap swap-${variant}`}>
      <input
        checked={checked}
        type="checkbox"
        defaultChecked={defaultValue}
        onChange={handleChange}
      />
      {children}
    </label>
  )
}
