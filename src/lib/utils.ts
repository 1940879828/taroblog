import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMobile() {
  // 服务端渲染时返回 false
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  // @ts-expect-error - window.opera 可能不存在于类型定义中，但某些浏览器支持
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // 移动端常见标识符
  const mobileRegex = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i

  return mobileRegex.test(userAgent)
}