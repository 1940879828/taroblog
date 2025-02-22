import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMobile() {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // 移动端常见标识符
  const mobileRegex = /Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i

  return mobileRegex.test(userAgent)
}
