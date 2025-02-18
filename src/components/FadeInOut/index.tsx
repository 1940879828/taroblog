import { AnimatePresence, motion } from "framer-motion"
import type React from "react"
import type { PropsWithChildren } from "react"

type Props = {
  from: "down" | "up" | "left" | "right"
  visible: boolean
  className?: string
}

const FadeInOut: React.FC<PropsWithChildren<Props>> = ({
  children,
  from,
  visible,
  className
}) => {
  const visibleTransform = {
    down: "translateY(0)",
    up: "translateY(0)",
    left: "translateX(0)",
    right: "translateX(0)"
  }[from]

  const hiddenTransform = {
    down: "translateY(10%)",
    up: "translateY(-10%)",
    left: "translateX(-10%)",
    right: "translateX(10%)"
  }[from]

  const variants = {
    visible: {
      opacity: 1,
      transform: visibleTransform
    },
    hidden: {
      opacity: 0,
      transform: hiddenTransform
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={className}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ duration: 0.218 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FadeInOut
