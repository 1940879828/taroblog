"use client"
import Button from "@/components/Button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <Button
      variant="neutral"
      className={cn("w-16", className)}
      onClick={() => router.back()}
    >
      返回
    </Button>
  )
}
