import { cn } from "@/lib/utils"
import type React from "react"
import type { ReactNode } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  elevation?: number
  className?: string
  children?: ReactNode
}

const Paper: React.FC<Props> = ({
  elevation = 0,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("rounded", className)}
      style={{
        boxShadow: `var(--my-paper-shadow-${elevation})`,
        backgroundImage: `var(--my-paper-overlay-${elevation})`
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default Paper
