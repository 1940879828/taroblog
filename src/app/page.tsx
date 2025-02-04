"use client"
import {
  CARD_CONFIG,
  canvasWidth,
  drawDashedLine,
  drawLine,
  makeTextRect
} from "@/lib/drawRoadmap"
import Konva from "konva"
import React, { useEffect } from "react"
import Group = Konva.Group
import {
  type RoadMapLeftTree,
  type RoadMapRightTree,
  map
} from "@/config/roadMap"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const width = canvasWidth
    const height = window.innerHeight

    // 创建 Stage
    const stage = new Konva.Stage({
      container: "container", // 绑定到 id 为 container 的 div
      width: width,
      height: height
    })

    // 创建 Layer
    const mainLayer = new Konva.Layer()
    const lineLayer = new Konva.Layer()

    // 重新计算y轴位置 相对定位->绝对定位
    map.forEach((item, index) => {
      const prevY = map[index - 1] ? map[index - 1].y : 20
      item.y = item.y + prevY
    })

    // 画连接线
    for (let i = 0; i < map.length - 1; i++) {
      const rect1 = map[i] // 当前矩形
      const rect2 = map[i + 1] // 下一个矩形

      // 调用 drawLine 函数生成连接线
      const line = drawLine(rect1, rect2, i)

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

        // 创建当前矩形
        const currentRect = makeTextRect({
          ...node,
          x: currentX,
          y: mainRectY + node.y
        })
        // 绘制连接父节点和当前节点的虚线
        const line = drawDashedLine({
          parentGroup,
          childGroup: currentRect,
          tree: isLeftTree ? "left" : "right"
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
      const mainRectGroup: Group = makeTextRect(item)
      mainLayer.add(mainRectGroup)
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

    mainLayer.on("click", (e) => {
      // 获取点击的目标形状
      const target = e.target

      // 判断目标形状是否有 link 属性
      if (target.getAttr("link")) {
        // 跳转到 link 属性指定的链接
        router.push(`/note/${target.getAttr("link")}`)
      }
    })

    // 将 Layer 添加到 Stage
    stage.add(lineLayer)
    stage.add(mainLayer)
  }, [])
  return <div id="container" />
}
