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
    y: 20,
    fill: "#A9A9A9",
    link: "",
    text: "计算机网络"
  },
  {
    y: 180,
    fill: "#4285F4",
    link: "",
    text: "浏览器"
  },
  {
    y: 180,
    fill: "#e5ea22",
    link: "",
    text: "编辑器"
  },
  {
    y: 180,
    fill: "#e0744c",
    link: "/html",
    text: "HTML"
  },
  {
    y: 180,
    fill: "#8552cb",
    link: "",
    text: "CSS"
  },
  {
    y: 180,
    fill: "#fbd200",
    link: "",
    text: "JavaScript"
  },
  {
    y: 180,
    fill: "#bf5555",
    link: "",
    text: "包管理器"
  },
  {
    y: 180,
    fill: "#d34d30",
    link: "",
    text: "版本控制系统"
  },
  {
    y: 180,
    fill: "#63aa7b",
    link: "",
    text: "Vue"
  },
  {
    y: 180,
    fill: "#109ccf",
    link: "",
    text: "React"
  },
  {
    y: 180,
    fill: "#5dae47",
    link: "",
    text: "Node.js"
  },
  {
    y: 180,
    fill: "#6F42C1",
    link: "",
    // next
    text: "应用框架"
  },
  {
    y: 180,
    fill: "#0057E7",
    link: "",
    // next
    text: "质量工程",
    children: [
      [
        {
          y: 180,
          fill: "#3077c5",
          link: "",
          text: "TypeScript",
          marginRight: 20
        }
      ],
      []
    ]
  },
  {
    y: 180,
    fill: "#FD7E14",
    link: "",
    // next
    text: "性能优化"
  },
  {
    y: 180,
    fill: "#28A745",
    link: "",
    // next
    text: "小程序"
  },
  {
    y: 180,
    fill: "#28A745",
    link: "",
    // next
    text: "Web3"
  }
]
