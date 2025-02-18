import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import React, { type ReactNode } from "react"

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: ReactNode
}

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      neutral: "btn-neutral",
      primary: "btn-primary",
      outline: "btn-outline hover:bg-opacity-50",
      secondary: "btn-secondary",
      accent: "btn-accent",
      ghost: "btn-ghost",
      info: "btn-info",
      success: "btn-success no-animation",
      warning: "btn-warning no-animation",
      error: "btn-error no-animation"
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg"
    },
    shape: {
      default: "",
      square: "btn-square",
      circle: "btn-circle"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    shape: "default"
  }
})

const Button: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant, size, shape, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
export default Button
