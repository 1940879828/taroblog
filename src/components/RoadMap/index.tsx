"use client"
import Message from "@/components/Message"
import {
  type RoadMapLeftTree,
  type RoadMapRightTree,
  map as _map
} from "@/config/roadMap"
import {
  CARD_CONFIG,
  canvasHeight,
  canvasWidth,
  drawDashedLine,
  drawLine,
  makeTextRect
} from "@/lib/drawRoadmap"
import { isMobile } from "@/lib/utils"
import { isHappyModeAtom } from "@/store/happyMode"
import { useAtomValue } from "jotai"
import Konva from "konva"
import type { Group } from "konva/lib/Group"
import _ from "lodash"
import { ChevronUp } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import styles from "./index.module.css"

// 添加工具函数
function getCenter(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  }
}

function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
}

type OverlayNode = {
  x: number
  y: number
  width: number
  height: number
  html: string
}

const RoadMap = () => {
  const { theme } = useTheme()
  const router = useRouter()
  const coverRef = useRef<HTMLDivElement | null>(null)
  const isHappyMode = useAtomValue(isHappyModeAtom)
  const [overlayNodes, setOverlayNodes] = useState<OverlayNode[]>([])
  const [stageTransform, setStageTransform] = useState({ x: 0, y: 0, scale: 1 })

  // 添加 ref 用于保存缩放状态
  const lastCenter = useRef<{ x: number; y: number } | null>(null)
  const lastDist = useRef(0)

  useEffect(() => {
    const container = document.getElementById("container")
    if (container) container.innerHTML = ""

    // 重置叠加层状态
    setOverlayNodes([])
    setStageTransform({ x: 0, y: 0, scale: 1 })

    // 创建 Stage
    const stage = new Konva.Stage({
      container: "container", // 绑定到 id 为 container 的 div
      width: canvasWidth,
      height: canvasHeight,
      draggable: true,
      dragDistance: 5, // 设置拖动触发阈值
      hitGraphEnabled: true // 启用精确命中检测
    })

    // 同步 Stage 变换到 HTML 叠加层
    const syncTransform = () => {
      setStageTransform({
        x: stage.x(),
        y: stage.y(),
        scale: stage.scaleX()
      })
    }

    stage.on("dragmove", syncTransform)

    // 添加触摸事件监听
    stage.on("touchmove", (e) => {
      e.evt.preventDefault()
      const touch1 = e.evt.touches[0]
      const touch2 = e.evt.touches[1]

      if (touch1 && touch2) {
        stage.draggable(false)
        if (stage.isDragging()) {
          stage.stopDrag()
        }

        const p1 = { x: touch1.clientX, y: touch1.clientY }
        const p2 = { x: touch2.clientX, y: touch2.clientY }

        if (!lastCenter.current) {
          lastCenter.current = getCenter(p1, p2)
          return
        }

        const newCenter = getCenter(p1, p2)
        const dist = getDistance(p1, p2)

        if (!lastDist.current) {
          lastDist.current = dist
        }

        const pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX()
        }

        const scale = stage.scaleX() * (dist / lastDist.current)
        stage.scaleX(scale)
        stage.scaleY(scale)

        const dx = newCenter.x - lastCenter.current.x
        const dy = newCenter.y - lastCenter.current.y
        const newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy
        }

        stage.position(newPos)
        lastDist.current = dist
        lastCenter.current = newCenter
        syncTransform()
      }
    })

    stage.on("touchend", () => {
      lastDist.current = 0
      lastCenter.current = null
      stage.draggable(true)
    })

    const map = _.cloneDeep(_map)
    // 创建 Layer
    const mainLayer = new Konva.Layer()
    const lineLayer = new Konva.Layer()

    // 重新计算y轴位置 相对定位->绝对定位
    map.forEach((item, index) => {
      const prevY = map[index - 1] ? map[index - 1].y : 20
      item.y = item.y + prevY
    })

    // 收集有 textCustomNode 的节点，供 HTML 叠加层渲染
    const collectedNodes: OverlayNode[] = []

    // 画连接线
    for (let i = 0; i < map.length - 1; i++) {
      const rect1 = map[i] // 当前矩形
      const rect2 = map[i + 1] // 下一个矩形

      // 调用 drawLine 函数生成连接线
      const line = drawLine({
        rect1,
        rect2,
        index: i,
        lineColor: theme === "dark" ? "white" : "black"
      })

      // 将连接线添加到 Layer
      lineLayer.add(line)
    }

    // 画左右子树
    const drawSubTree = ({
      tree,
      rootGroup,
      mainRectY
    }: {
      tree: RoadMapLeftTree | RoadMapRightTree
      rootGroup: Group
      mainRectY: number
    }) => {
      // 递归绘制子树
      const drawTreeItem = (
        parentGroup: Group,
        node: RoadMapLeftTree[number] | RoadMapRightTree[number]
      ) => {
        const isLeftTree = "marginRight" in node
        // 计算当前矩形的 x 坐标
        const parentClientRect = parentGroup.getClientRect()
        let currentX = 0
        if (isLeftTree) {
          const parentLeftX = parentClientRect.x
          currentX =
            parentLeftX - node.marginRight - (node.width || CARD_CONFIG.width)
        }
        if (!isLeftTree) {
          const parentRightX = parentClientRect.x + parentClientRect.width
          currentX = parentRightX + node.marginLeft
        }

        const nodeY = mainRectY + node.y
        const nodeWidth = node.width || CARD_CONFIG.width
        const nodeHeight = node.height || CARD_CONFIG.height

        // 创建当前矩形
        const currentRect = makeTextRect({
          ...node,
          x: currentX,
          y: nodeY,
          textColor: node.textColor,
          textCustomNode: node.textCustomNode
        })

        // 有 textCustomNode 时记录位置供叠加层渲染
        if (node.textCustomNode) {
          collectedNodes.push({
            x: currentX,
            y: nodeY,
            width: nodeWidth,
            height: nodeHeight,
            html: node.textCustomNode.replace(/className=/g, "class=")
          })
        }

        // 绘制连接父节点和当前节点的虚线
        const line = drawDashedLine({
          parentGroup,
          childGroup: currentRect,
          tree: isLeftTree ? "left" : "right",
          lineColor: theme === "dark" ? "white" : "black"
        })
        lineLayer.add(line) // 将虚线添加到 Layer
        // 将当前矩形添加到 Layer
        mainLayer.add(currentRect)
        // 如果有子节点，递归绘制子节点
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            drawTreeItem(currentRect, child)
          })
        }
      }
      // 遍历左子树并开始绘制
      tree.forEach((node) => {
        drawTreeItem(rootGroup, node)
      })
    }
    // 画矩形
    map.forEach((item) => {
      const itemWidth = item.width || CARD_CONFIG.width
      const itemHeight = item.height || CARD_CONFIG.height
      const mainRectGroup: Group = makeTextRect(item)
      mainLayer.add(mainRectGroup)

      // 有 textCustomNode 时记录位置供叠加层渲染
      if (item.textCustomNode) {
        collectedNodes.push({
          x: (canvasWidth - itemWidth) / 2,
          y: item.y,
          width: itemWidth,
          height: itemHeight,
          html: item.textCustomNode.replace(/className=/g, "class=")
        })
      }

      // 画左子树🌳的矩形
      const leftTree = item?.children?.[0]
      if (leftTree && leftTree.length > 0) {
        drawSubTree({
          tree: leftTree,
          rootGroup: mainRectGroup,
          mainRectY: item.y
        })
      }
      // 画右子树🌳的矩形
      const rightTree = item?.children?.[1]
      if (rightTree && rightTree.length > 0) {
        drawSubTree({
          tree: rightTree,
          rootGroup: mainRectGroup,
          mainRectY: item.y
        })
      }
    })

    setOverlayNodes(collectedNodes)

    // 添加鼠标滚轮缩放功能
    if (!isMobile()) {
      stage.on("wheel", (e) => {
        e.evt.preventDefault()
        const scaleBy = 1.1
        const oldScale = stage.scaleX()
        const pointer = stage.getPointerPosition()

        if (!pointer) return

        // 计算新的缩放比例（限制在0.5到5倍之间）
        let newScale =
          e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy
        newScale = Math.max(0.5, Math.min(newScale, 5))

        // 计算缩放中心点
        const mousePointTo = {
          x: (pointer.x - stage.x()) / oldScale,
          y: (pointer.y - stage.y()) / oldScale
        }

        // 更新舞台位置和缩放比例
        stage.scale({ x: newScale, y: newScale })
        stage.position({
          x: pointer.x - mousePointTo.x * newScale,
          y: pointer.y - mousePointTo.y * newScale
        })

        stage.batchDraw()
        syncTransform()
      })
    }

    // 在 Layer 上监听 mouseenter 和 mouseleave 事件
    mainLayer.on("mouseenter", (e) => {
      // 如果事件目标是矩形（或其他形状），则修改光标样式
      if (e.target instanceof Konva.Rect) {
        stage.container().style.cursor = "pointer"
      }
    })

    mainLayer.on("mouseleave", (_e) => {
      // 恢复默认光标
      stage.container().style.cursor = "default"
    })

    const handleTap = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const target = e.target

      // 添加触摸事件过滤
      if (e.evt.type === "touchend" && lastDist.current !== 0) {
        return
      }

      const link = target.getAttr("link")
      if (link) {
        if (String(link).includes("http")) {
          if (typeof window !== 'undefined') {
            window.open(link, "_blank")
          }
        } else {
          router.push(`/note/${link}`)
        }
      } else {
        Message.warning("这个卡片暂未设置链接~", { justify: "center" })
      }
    }

    // 修改事件监听方式
    mainLayer.on("tap", handleTap)
    mainLayer.on("click", handleTap)

    // 将 Layer 添加到 Stage
    stage.add(lineLayer)
    stage.add(mainLayer)
  }, [theme])

  function goToTop() {
    if (coverRef) {
      coverRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  return (
    <>
      <div ref={coverRef} />
      <div hidden={!isHappyMode} className={styles.angleDown} onClick={goToTop}>
        <ChevronUp size={32} />
      </div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          id="container"
          style={{
            display: "flex",
            justifyContent: "center",
            background: theme === "dark" ? "#181818" : "transparent"
          }}
        />
        {overlayNodes.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: canvasWidth,
              height: canvasHeight,
              pointerEvents: "none",
              transformOrigin: "0 0",
              transform: `translate(${stageTransform.x}px, ${stageTransform.y}px) scale(${stageTransform.scale})`
            }}
          >
            {overlayNodes.map((node, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: node.x,
                  top: node.y,
                  width: node.width,
                  height: node.height,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontFamily:
                    "Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif"
                }}
                dangerouslySetInnerHTML={{ __html: node.html }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default RoadMap
