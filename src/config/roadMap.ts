export type RoadMapLeftTree = {
  /** 距画布顶部的距离 */
  y: number
  /** 子矩形右侧 和主矩形左侧 的距离 */
  marginRight: number
  /** 矩形宽度 */
  width?: number
  /** 矩形高度 */
  height?: number
  /** 矩形背景颜色 */
  fill: string
  /** 路由 */
  link: string
  /** 矩形内填充文字 */
  text: string
  children?: RoadMapLeftTree
}[]
export type RoadMapRightTree = {
  /** 距画布顶部的距离 */
  y: number
  /** 子矩形左侧 和 主矩形右侧 的距离 */
  marginLeft: 100
  /** 矩形宽度 */
  width?: number
  /** 矩形高度 */
  height?: number
  /** 矩形背景颜色 */
  fill: string
  /** 路由 */
  link: string
  /** 矩形内填充文字 */
  text: string
  children?: RoadMapRightTree
}[]
export type RoadMap = {
  /** 距画布顶部的距离 */
  y: number
  /** 矩形宽度 */
  width?: number
  /** 矩形高度 */
  height?: number
  /** 矩形背景颜色 */
  fill: string
  /** 路由 */
  link: string
  /** 矩形内填充文字 */
  text: string
  children?: [RoadMapLeftTree, RoadMapRightTree]
}[]
export const map: RoadMap = [
  {
    y: 80,
    fill: "#e0744c",
    link: "/html",
    text: "HTML"
  }
]
