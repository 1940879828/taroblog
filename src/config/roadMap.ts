export type RoadMapLeftTree = {
  /** 距画布顶部的距离 */
  y: number
  /** 子矩形右侧 和主矩形左侧 的距离 */
  marginRight: number
  /** 矩形宽度 */
  width: number
  /** 矩形高度 */
  height: number
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
  width: number
  /** 矩形高度 */
  height: number
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
  width: number
  /** 矩形高度 */
  height: number
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
    width: 100,
    height: 50,
    fill: "green",
    link: "/jump",
    text: "title",
    children: [
      [
        {
          y: 0,
          // 子矩形右侧 和主矩形左侧 的距离
          marginRight: 100,
          width: 100,
          height: 50,
          fill: "green",
          link: "/jump",
          text: "left",
          children: [
            {
              y: 40,
              marginRight: 100,
              width: 100,
              height: 50,
              fill: "green",
              link: "/jump",
              text: "left"
            }
          ]
        },
        {
          y: 80,
          // 子矩形右侧 和主矩形左侧 的距离
          marginRight: 100,
          width: 100,
          height: 50,
          fill: "green",
          link: "/jump",
          text: "left2"
        }
      ],
      [
        {
          // 子矩形左侧 和 主矩形右侧 的距离
          y: 0,
          marginLeft: 100,
          width: 100,
          height: 50,
          fill: "green",
          link: "/jump",
          text: "right"
        }
      ]
    ]
  },
  {
    y: 120,
    width: 100,
    height: 50,
    fill: "orange",
    link: "/jump",
    text: "title"
  },
  {
    y: 220,
    width: 100,
    height: 50,
    fill: "orange",
    link: "/jump",
    text: "title"
  },
  {
    y: 320,
    width: 100,
    height: 50,
    fill: "orange",
    link: "/jump",
    text: "title"
  }
]
