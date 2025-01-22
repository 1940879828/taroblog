import React from "react"
import {Group, Rect, Text} from "react-konva"

// 你的 makeTextSquare 函数，返回的是一个对象而非 React 组件
export function TextSquare(
  text: string,
  {
    x,
    y,
    w = 200,
    h = 100,
    bgColor = "#ff00ff",
    textColor = "#000000"
  }: {
    x: number
    y: number
    depth?: number
    w?: number
    h?: number
    bgColor?: string
    textColor?: string
  }
) {
  return (
    <Group x={x} y={y} draggable={false} key={`${x}-${y}`}>
      <Rect
        fill={bgColor}
        width={w}
        height={h}
        cornerRadius={4}
        shadowBlur={4}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.3}
        offsetX={w / 2}
        offsetY={h / 2}
      />
      <Text
        text={text}
        fontSize={15}
        fill={textColor}
        fontFamily="Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif"
        fontWeight="500"
        offsetX={w / 2}
        offsetY={h / 2}
      />
    </Group>
  )
}
