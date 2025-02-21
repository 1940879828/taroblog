import { cn } from "@/lib/utils"
import type React from "react"
import type { ReactNode } from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  elevation?: number
  className?: string
  children?: ReactNode
}

const Paper: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn("card drop-shadow-md bg-base-100", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Paper
