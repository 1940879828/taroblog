import { useAsyncEffect } from "ahooks"
import type { Timeout } from "ahooks/es/useRequest/src/types"
import type React from "react"
import { useEffect } from "react"
import { type PropsWithChildren, useRef } from "react"
import styles from "./index.module.css"

interface Props {
  keyword?: string
  delayInMilliseconds?: number
  isCaseInsensitive?: boolean
}
const KeywordHighlight: React.FC<PropsWithChildren<Props>> = ({
  keyword,
  delayInMilliseconds = 70,
  isCaseInsensitive,
  children
}) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const timerRef = useRef<Timeout>(null)

  const removeWrappedElement = () => {
    if (!wrapper.current) return
    const elements = wrapper.current.querySelectorAll("*")
    elements.forEach((element) => {
      const { nodeName, childNodes, classList } = element
      const isWrapperElement =
        nodeName.toLowerCase() === "mark" &&
        classList.contains(styles.highlight)
      if (!isWrapperElement) return

      Array.from(childNodes).forEach((child) =>
        element.parentNode?.insertBefore(child, element)
      )
      element.parentNode?.removeChild(element)
    })
  }

  const highlightKeywords = () => {
    if (!keyword?.trim() || !wrapper.current) return
    const rawKeyword = keyword
      .replace(/[{}\[\]()^$.*?+|\\]/g, "\\$0")
      .trim()
      .replace(/\s+/g, "|")
    const regular = new RegExp(`(${rawKeyword})`, isCaseInsensitive ? "i" : "")
    const elements = wrapper.current.querySelectorAll("*")
    elements.forEach((element) => {
      const { childNodes } = element
      Array.from(childNodes).forEach((node) => {
        const isMatched =
          node.nodeType === node.TEXT_NODE &&
          node.textContent &&
          regular.test(node.textContent)
        if (!isMatched) return
        const nodes = splitTextToNodes(node.textContent!, regular)
        nodes.forEach((textNode) =>
          node.parentNode?.insertBefore(textNode, node)
        )
        node.parentNode?.removeChild(node)
      })
    })
  }

  const splitTextToNodes = (text: string, regular: RegExp) => {
    return text.split(regular).map((part) => {
      const textNode = document.createTextNode(part)
      if (!regular.test(part)) return textNode
      const element = document.createElement("mark")
      element.classList.add(styles.highlight)
      element.appendChild(textNode)
      return element
    })
  }

  useEffect(() => {
    if (!wrapper.current) return

    const observer = new MutationObserver((_mutations) => {
      // 检测到变化，清除定时器，重新设置
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        removeWrappedElement()
        highlightKeywords()
      }, delayInMilliseconds)
    })

    observer.observe(wrapper.current, {
      childList: true,
      subtree: true,
      characterData: true
    })

    timerRef.current = setTimeout(() => {
      removeWrappedElement()
      highlightKeywords()
    }, delayInMilliseconds)

    return () => {
      observer.disconnect()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [keyword, delayInMilliseconds])

  return <div ref={wrapper}>{children}</div>
}

export default KeywordHighlight
