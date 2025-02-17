import React, { useRef, useEffect } from "react"

type ClickAwayListenerProps = {
  children: React.ReactElement
  disableReactTree?: boolean
  mouseEvent?:
    | "onClick"
    | "onMouseDown"
    | "onMouseUp"
    | "onPointerDown"
    | "onPointerUp"
    | false
  onClickAway: (event: MouseEvent | TouchEvent) => void
  touchEvent?: "onTouchEnd" | "onTouchStart" | false
}

function mapEventPropToEvent(eventProp: string): string {
  return eventProp.substring(2).toLowerCase()
}

function clickedRootScrollbar(event: MouseEvent, doc: Document): boolean {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  )
}

const ClickAwayListener: React.FC<ClickAwayListenerProps> = ({
  children,
  disableReactTree = false,
  mouseEvent = "onClick",
  onClickAway,
  touchEvent = "onTouchEnd"
}) => {
  const movedRef = useRef(false)
  const nodeRef = useRef<HTMLElement | null>(null)
  const activatedRef = useRef(false)
  const syntheticEventRef = useRef(false)

  useEffect(() => {
    setTimeout(() => {
      activatedRef.current = true
    }, 0)

    return () => {
      activatedRef.current = false
    }
  }, [])

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    const insideReactTree = syntheticEventRef.current
    syntheticEventRef.current = false
    const doc = document

    if (
      !activatedRef.current ||
      !nodeRef.current ||
      ("clientX" in event && clickedRootScrollbar(event as MouseEvent, doc))
    ) {
      return
    }

    if (movedRef.current) {
      movedRef.current = false
      return
    }

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let insideDOM

    if (event.composedPath) {
      insideDOM = event.composedPath().includes(nodeRef.current)
    } else {
      insideDOM =
        !doc.documentElement.contains(event.target as Node) ||
        nodeRef.current.contains(event.target as Node)
    }

    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event)
    }
  }

  const createHandleSynthetic =
    (handlerName: string) => (event: React.SyntheticEvent) => {
      syntheticEventRef.current = true
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const childrenPropsHandler = (children.props as any)[handlerName]
      if (childrenPropsHandler) {
        childrenPropsHandler(event)
      }
    }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const childrenProps: any = {
    ref: (node: HTMLElement | null) => {
      nodeRef.current = node
      if (children && "ref" in children) {
        if (typeof children.ref === "function") {
          children.ref(node)
        } else if (children.ref) {
          ;(
            children.ref as React.MutableRefObject<HTMLElement | null>
          ).current = node
        }
      }
    }
  }

  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent)
  }

  useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(
        touchEvent
      ) as keyof DocumentEventMap
      const doc = document

      const handleTouchMove = () => {
        movedRef.current = true
      }

      const listener: EventListener = (event) => {
        handleClickAway(event as MouseEvent | TouchEvent)
      }

      doc.addEventListener(mappedTouchEvent, listener)
      doc.addEventListener("touchmove", handleTouchMove)

      return () => {
        doc.removeEventListener(mappedTouchEvent, listener)
        doc.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [handleClickAway, touchEvent])

  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent)
  }

  useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(
        mouseEvent
      ) as keyof DocumentEventMap
      const doc = document

      const listener: EventListener = (event) => {
        handleClickAway(event as MouseEvent | TouchEvent)
      }

      doc.addEventListener(mappedMouseEvent, listener)

      return () => {
        doc.removeEventListener(mappedMouseEvent, listener)
      }
    }
  }, [handleClickAway, mouseEvent])

  return React.cloneElement(children, childrenProps)
}

export default ClickAwayListener
