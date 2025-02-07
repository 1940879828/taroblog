export type RoadMapLeftTree = {
  /** 相对主轴矩形的偏移量 */
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
  /** 相对主轴矩形的偏移量 */
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
  /** 第一个：距画布顶部的距离 其余：相对上一个矩形的偏移量 */
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
    link: "计算机网络",
    text: "计算机网络"
  },
  {
    y: 80,
    fill: "#4285F4",
    link: "",
    text: "浏览器",
    children: [
      [
        {
          y: 0,
          fill: "#4285F4",
          link: "localStorage",
          text: "本地存储",
          marginRight: 80
        }
      ],
      []
    ],
  },
  {
    y: 80,
    fill: "#e5ea22",
    link: "",
    text: "编辑器"
  },
  {
    y: 80,
    fill: "#e0744c",
    link: "/html",
    text: "HTML"
  },
  {
    y: 80,
    fill: "#8552cb",
    link: "",
    text: "CSS"
  },
  {
    y: 80,
    fill: "#fbd200",
    link: "",
    text: "JavaScript"
  },
  {
    y: 80,
    fill: "#bf5555",
    link: "",
    text: "包管理器"
  },
  {
    y: 80,
    fill: "#d34d30",
    link: "",
    text: "版本控制系统"
  },
  {
    y: 80,
    fill: "#63aa7b",
    link: "",
    text: "Vue"
  },
  {
    y: 80,
    fill: "#109ccf",
    link: "",
    text: "React"
  },
  {
    y: 80,
    fill: "#5dae47",
    link: "",
    text: "Node.js"
  },
  {
    y: 80,
    fill: "#6F42C1",
    link: "",
    // next
    text: "应用框架"
  },
  {
    y: 80,
    fill: "#0057E7",
    link: "",
    // next
    text: "质量工程",
    children: [
      [
        {
          y: 80,
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
    y: 80,
    fill: "#FD7E14",
    link: "前端性能优化",
    // next
    text: "性能优化"
  },
  {
    y: 80,
    fill: "#28A745",
    link: "",
    // next
    text: "小程序"
  },
  {
    y: 80,
    fill: "#28A745",
    link: "",
    // next
    text: "Web3"
  }
]
