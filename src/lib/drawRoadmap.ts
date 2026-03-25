import type { RoadMap } from "@/config/roadMap"
import Konva from "konva"

// 卡片默认参数
export const CARD_CONFIG = {
  width: 140,
  height: 40,
  color: "oklch(23.574% 0.066 313.189)"
}

// 画布宽度 - 服务端渲染时使用默认值，避免访问 window
export const canvasWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
export const canvasHeight = typeof window !== 'undefined' ? window.innerHeight - 65 : 1080
// 画带有文字的方块
export const makeTextRect = (props: {
  /** 距离画布左边👈的距离 */
  x?: number
  /** 距离画布上边👆的距离 */
  y: number
  /** 宽度 */
  width?: number
  /** 高度 */
  height?: number
  /** 背景颜色 */
  fill: string
  /** 要跳转的路由 */
  link: string
  /** 矩形内显示的文字 */
  text: string
  /** 文字颜色 */
  textColor?: string
}) => {
  const {
    x,
    y,
    width = CARD_CONFIG.width,
    height = CARD_CONFIG.height,
    fill,
    link,
    text,
    textColor
  } = props
  // 计算矩形水平居中的 x 坐标
  const rectX = (canvasWidth - width) / 2
  const rect = new Konva.Rect({
    x: x || rectX,
    y,
    width,
    height,
    fill,
    cornerRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowOpacity: 0.3
  })
  rect.setAttr("link", link)

  // 创建文字
  const textNode = new Konva.Text({
    x: x || rectX, // 文字起始位置
    y: y, // 文字起始位置与矩形一致
    width: width, // 文字宽度与矩形一致
    height: height, // 文字高度与矩形一致
    text: text,
    fontSize: 16, // 字体大小
    fontFamily:
      "Helvetica, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', Arial, sans-serif",
    fill: textColor || CARD_CONFIG.color, // 字体颜色
    align: "center", // 水平居中
    verticalAlign: "middle", // 垂直居中
    listening: false // 禁止文字响应事件
  })

  const group = new Konva.Group({
    perfectDrawEnabled: false
  })
  group.add(rect)
  group.add(textNode)

  return group
}

// 画主轴连接线
export const drawLine = ({
  rect1,
  rect2,
  index,
  lineColor
}: {
  rect1: RoadMap[number]
  rect2: RoadMap[number]
  index: number
  lineColor: "black" | "white"
}) => {
  const minTwist = 20
  const maxTwist = 50

  const rect1Width = rect1.width || CARD_CONFIG.width
  const rect2Width = rect2.width || CARD_CONFIG.width
  const rect1Height = rect1.height || CARD_CONFIG.height
  const rect2Height = rect2.height || CARD_CONFIG.height

  // 没有x就是居中的
  // 计算矩形水平居中的 x 坐标
  const rect1X = (canvasWidth - rect1Width) / 2
  const rect2X = (canvasWidth - rect2Width) / 2

  // 计算连接线的起点和终点
  const startX = rect1X + rect1Width / 2 // 第一个矩形的中心点 X
  const startY = rect1.y + rect1Height / 2 // 第一个矩形的中心点 Y
  const endX = rect2X + rect2Width / 2 // 第二个矩形的中心点 X
  const endY = rect2.y + rect2Height / 2 // 第二个矩形的中心点 Y

  // 计算中间控制点
  const midX = (startX + endX) / 2 // 中间点的 X 坐标
  const midY = (startY + endY) / 2 - 5 // 中间点的 Y 坐标

  // 生成在 minTwist 和 maxTwist 之间的随机扭曲幅度
  const twistOffset = minTwist + Math.random() * (maxTwist - minTwist)

  // 根据 index 的奇偶性决定扭曲方向
  const twistDirection = index % 2 === 0 ? 1 : -1 // 偶数向左，奇数向右
  const controlX = midX + twistDirection * twistOffset // 控制点的 X 坐标

  // 创建连接线（使用贝塞尔曲线）
  return new Konva.Line({
    points: [startX, startY, controlX, midY, endX, endY], // 起点、控制点、终点
    stroke: lineColor, // 线条颜色
    strokeWidth: 3, // 线条宽度
    lineCap: "round", // 线条端点样式
    lineJoin: "round", // 线条连接点样式
    tension: 0.5, // 贝塞尔曲线张力
    perfectDrawEnabled: false
  })
}

// 画连接线 水平轴
type DrawDashedLineProps = {
  /** 父Group */
  parentGroup: Konva.Group
  /** 子Group */
  childGroup: Konva.Group
  /** 左子树还是右子树 */
  tree?: "left" | "right"
  /** 线条颜色 */
  lineColor: "black" | "white"
}
export const drawDashedLine = (args: DrawDashedLineProps) => {
  const { tree, parentGroup, childGroup, lineColor } = args
  // 没有x就是居中的
  // 计算矩形水平居中的 x 坐标
  const parentClientRect = parentGroup.getClientRect()
  const childClientRect = childGroup.getClientRect()
  // 计算连接线的起点和终点
  let startX: number
  let startY: number
  let endX: number
  let endY: number
  if (tree === "left") {
    // 起始点为第一个矩形的左侧中间
    startX = parentClientRect.x // 左侧 X 坐标
    startY = parentClientRect.y + parentClientRect.height / 2 // 中间 Y 坐标
    // 终点为第二个矩形的右侧中间
    endX = childClientRect.x + childClientRect.width // 右侧 X 坐标
    endY = childClientRect.y + childClientRect.height / 2 // 中间 Y 坐标
  } else if (tree === "right") {
    // 起始点为第一个矩形的右侧中间
    startX = parentClientRect.x + parentClientRect.width // 右侧 X 坐标
    startY = parentClientRect.y + parentClientRect.height / 2 // 中间 Y 坐标
    // 终点为第二个矩形的左侧中间
    endX = childClientRect.x // 左侧 X 坐标
    endY = childClientRect.y + childClientRect.height / 2 // 中间 Y 坐标
  } else {
    // 默认情况（居中连接）
    startX = parentClientRect.x + parentClientRect.width / 2 // 第一个矩形的中心点 X
    startY = parentClientRect.y + parentClientRect.height / 2 // 第一个矩形的中心点 Y
    endX = childClientRect.x + childClientRect.width / 2 // 第二个矩形的中心点 X
    endY = childClientRect.y + childClientRect.height / 2 // 第二个矩形的中心点 Y
  }

  // 计算中间控制点
  const midX = (startX + endX) / 2 // 中间点的 X 坐标
  const midY = (startY + endY) / 2 - 10 // 中间点的 Y 坐标，稍微上移以形成微拱形

  // 创建连接线（使用贝塞尔曲线）
  return new Konva.Line({
    points: [startX, startY, midX, midY, endX, endY], // 起点、控制点、终点
    stroke: lineColor, // 线条颜色
    strokeWidth: 2, // 线条宽度
    lineCap: "round", // 线条端点样式
    lineJoin: "round", // 线条连接点样式
    tension: 0.5, // 贝塞尔曲线张力
    dash: [5, 5], // 虚线样式，5像素实线，5像素空白
    perfectDrawEnabled: false
  })
}
