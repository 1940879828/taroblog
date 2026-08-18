export type RoadMapCustomText = {
  className?: string
  segments: {
    text: string
    className?: string
  }[]
}

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
  /** 文字颜色 */
  textColor?: string
  /** 自定义节点内容（优先级高于 text 和 textColor） */
  textCustomNode?: RoadMapCustomText
  children?: RoadMapLeftTree
}[]
export type RoadMapRightTree = {
  /** 相对主轴矩形的偏移量 */
  y: number
  /** 子矩形左侧 和 主矩形右侧 的距离 */
  marginLeft: number
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
  /** 文字颜色 */
  textColor?: string
  /** 自定义节点内容（优先级高于 text 和 textColor） */
  textCustomNode?: RoadMapCustomText
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
  text?: string
  /** 文字颜色 */
  textColor?: string
  /** 自定义节点内容（优先级高于 text 和 textColor） */
  textCustomNode?: RoadMapCustomText
  children?: [RoadMapLeftTree, RoadMapRightTree]
}[]

export const map: RoadMap = [
  {
    y: 20,
    fill: "#A9A9A9",
    link: "计算机网络",
    text: "计算机网络",
    children: [
      [
        {
          y: 0,
          fill: "#8c42f1",
          link: "WebSocket二次封装hook",
          text: "WebSocket",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#0078D7",
    link: "",
    text: "windows系统"
  },
  {
    y: 80,
    fill: "#1E90FF",
    link: "关于浏览器的一些内容",
    text: "浏览器",
    children: [
      [
        {
          y: 0,
          fill: "#C4C4D5",
          link: "localStorage",
          text: "本地存储",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#ea5455",
    link: "关于编辑器的一些内容",
    text: "编辑器",
    children: [
      [],
      [
        {
          y: -60,
          fill: "#4f5e85",
          link: "关于编辑器的一些内容",
          text: "WebStorm",
          marginLeft: 80
        },
        {
          y: 0,
          fill: "#0078d4",
          link: "关于编辑器的一些内容",
          text: "VSCode",
          marginLeft: 80
        },
        {
          y: 60,
          fill: "#ff9800",
          link: "关于编辑器的一些内容",
          text: "Sublime",
          marginLeft: 80
        }
      ]
    ]
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
    link: "关于CSS的一些内容",
    text: "CSS",
    children: [
      [],
      [
        {
          y: 0,
          fill: "#b83e9b",
          link: "关于CSS的一些内容",
          text: "现代CSS框架:Tailwind",
          width: 180,
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#fbd200",
    link: "",
    text: "JavaScript",
    children: [
      [
        {
          y: 0,
          fill: "#3077c5",
          link: "",
          text: "TypeScript",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#bf5555",
    link: "",
    text: "包管理器",
    children: [
      [],
      [
        {
          y: 0,
          fill: "#e57b86",
          link: "https://juejin.cn/post/6962554654643191815",
          text: "给三方包打补丁",
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#d34d30",
    link: "",
    text: "版本控制系统",
    children: [
      [],
      [
        {
          y: 0,
          fill: "#ff5a3a",
          link: "关于github推送那些事",
          text: "配置SSH连接的坎坷",
          width: 180,
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 120,
    fill: "#63aa7b",
    link: "",
    text: "Vue",
    children: [
      [],
      [
        {
          y: -40,
          fill: "#f5b361",
          link: "关于Vue的一些内容",
          text: "UI库",
          marginLeft: 80,
          children: [
            {
              y: -100,
              fill: "#3f85ed",
              link: "关于Vue的一些内容",
              text: "Element Plus",
              marginLeft: 80
            },
            {
              y: -40,
              fill: "#f85961",
              link: "关于Vue的一些内容",
              text: "Ant Design Vue",
              marginLeft: 80
            },
            {
              y: 20,
              fill: "#36d7b7",
              link: "关于Vue的一些内容",
              text: "Vant UI",
              marginLeft: 80
            }
          ]
        },
        {
          y: 20,
          fill: "#6F42C1",
          link: "关于Vue的一些内容",
          text: "Nuxt.js",
          marginLeft: 80
        },
        {
          y: 80,
          fill: "#b341fe",
          link: "关于Vue的一些内容",
          text: "Vite",
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#109ccf",
    link: "关于React的一些内容",
    text: "React",
    children: [
      [
        {
          y: -100,
          fill: "#f5b361",
          link: "关于React的一些内容",
          text: "UI库",
          marginRight: 80,
          children: [
            {
              y: -230,
              fill: "#a8e0e5",
              link: "关于React的一些内容",
              text: "daisyUI",
              marginRight: 80
            },
            {
              y: -170,
              fill: "#a8e0e5",
              link: "关于React的一些内容",
              text: "shadcn/ui",
              marginRight: 80
            },
            {
              y: -110,
              fill: "#a8e0e5",
              link: "关于React的一些内容",
              text: "Material UI",
              marginRight: 80
            },
            {
              y: -50,
              fill: "#a8e0e5",
              link: "关于React的一些内容",
              text: "Magic UI",
              marginRight: 80
            },
            {
              y: 10,
              fill: "#a8e0e5",
              link: "关于React的一些内容",
              text: "Ant Design",
              marginRight: 80
            },
            {
              y: 10,
              fill: "#cf63ff",
              link: "关于React的一些内容",
              text: "Ant Design X",
              marginRight: 80
            }
          ]
        },
        {
          y: -10,
          fill: "#6F42C1",
          link: "关于React的一些内容",
          text: "Next.js",
          marginRight: 80,
          children: [
            {
              y: 70,
              fill: "#6F42C1",
              link: "Next中seo优化实践",
              text: "seo优化",
              marginRight: 60
            }
          ]
        },
        {
          y: 80,
          fill: "#f85961",
          link: "React19新特性",
          text: "React19新特性",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 180,
    fill: "#5dae47",
    link: "",
    text: "Node.js",
    children: [
      [],
      [
        {
          y: -40,
          fill: "#5dae47",
          link: "",
          text: "Express.js",
          marginLeft: 20,
          children: [
            {
              y: -60,
              fill: "#cdbf9b",
              link: "",
              text: "数据库",
              marginLeft: 20,
              children: [
                {
                  y: -80,
                  fill: "#017899",
                  link: "Mysql数据库常用命令",
                  text: "Mysql",
                  marginLeft: 40
                },
                {
                  y: 0,
                  fill: "#37a742",
                  link: "MongoDB常用命令",
                  text: "MongoDB",
                  marginLeft: 40
                }
              ]
            },
            {
              y: 0,
              fill: "#ea2860",
              link: "",
              text: "Nest.js",
              marginLeft: 20
            }
          ]
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#0057E7",
    link: "",
    // next
    text: "质量工程"
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
    text: "小程序"
  },
  {
    y: 80,
    fill: "#28A745",
    link: "",
    text: "Web3"
  },
  {
    y: 80,
    fill: "#000000",
    text: "ai",
    width: 160,
    link: "AritificialIntelligence",
    textCustomNode: {
      className: "text-[#CCCCCC]",
      segments: [
        { text: "A", className: "text-[#ffffff]" },
        { text: "rtificial " },
        { text: "I", className: "text-[#ffffff]" },
        { text: "ntelligence" }
      ]
    },
    children: [
      [],
      [
        {
          y: 0,
          fill: "#000000",
          link: "提示词工程",
          text: "提示词工程",
          textColor: "#ffffff",
          marginLeft: 40
        }
      ]
    ]
  }
]

export const backendMap: RoadMap = [
  {
    y: 20,
    fill: "#A9A9A9",
    link: "",
    text: "计算机网络"
  },
  {
    y: 80,
    fill: "#0078D7",
    link: "",
    text: "操作系统",
    children: [
      [],
      [
        {
          y: -30,
          fill: "#e07b39",
          link: "",
          text: "Linux",
          marginLeft: 80
        },
        {
          y: 30,
          fill: "#0078D7",
          link: "",
          text: "Windows Server",
          marginLeft: 80,
          width: 160
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#e65c00",
    link: "Java笔记",
    text: "Java",
    children: [
      [
        {
          y: -30,
          fill: "#c62828",
          link: "",
          text: "JVM",
          marginRight: 80
        },
        {
          y: 30,
          fill: "#1565c0",
          link: "",
          text: "并发编程",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#6db33f",
    link: "",
    text: "Spring",
    children: [
      [],
      [
        {
          y: -60,
          fill: "#6db33f",
          link: "",
          text: "Spring Boot",
          marginLeft: 80
        },
        {
          y: 0,
          fill: "#4caf50",
          link: "",
          text: "Spring MVC",
          marginLeft: 80
        },
        {
          y: 60,
          fill: "#388e3c",
          link: "",
          text: "Spring Cloud",
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#cdbf9b",
    link: "",
    text: "数据库",
    children: [
      [
        {
          y: -60,
          fill: "#017899",
          link: "Mysql数据库常用命令",
          text: "MySQL",
          marginRight: 80
        },
        {
          y: 0,
          fill: "#336791",
          link: "",
          text: "PostgreSQL",
          marginRight: 80
        },
        {
          y: 60,
          fill: "#37a742",
          link: "MongoDB常用命令",
          text: "MongoDB",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#d32f2f",
    link: "",
    text: "Redis",
    children: [
      [],
      [
        {
          y: -30,
          fill: "#e53935",
          link: "",
          text: "缓存策略",
          marginLeft: 80
        },
        {
          y: 30,
          fill: "#c62828",
          link: "",
          text: "分布式锁",
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#ff6f00",
    link: "",
    text: "消息队列",
    children: [
      [
        {
          y: -30,
          fill: "#e65100",
          link: "",
          text: "RabbitMQ",
          marginRight: 80
        },
        {
          y: 30,
          fill: "#bf360c",
          link: "",
          text: "Kafka",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#0db7ed",
    link: "",
    text: "Docker",
    children: [
      [],
      [
        {
          y: -30,
          fill: "#0288d1",
          link: "",
          text: "容器编排",
          marginLeft: 80
        },
        {
          y: 30,
          fill: "#326ce5",
          link: "",
          text: "Kubernetes",
          marginLeft: 80
        }
      ]
    ]
  },
  {
    y: 80,
    fill: "#5c6bc0",
    link: "",
    text: "微服务"
  },
  {
    y: 80,
    fill: "#00897b",
    link: "",
    text: "安全与认证",
    children: [
      [
        {
          y: -30,
          fill: "#00796b",
          link: "",
          text: "JWT",
          marginRight: 80
        },
        {
          y: 30,
          fill: "#004d40",
          link: "",
          text: "OAuth2",
          marginRight: 80
        }
      ],
      []
    ]
  },
  {
    y: 80,
    fill: "#3572A5",
    link: "",
    text: "Python",
    children: [
      [],
      [
        {
          y: -60,
          fill: "#2b5b84",
          link: "",
          text: "Django",
          marginLeft: 80
        },
        {
          y: 0,
          fill: "#009688",
          link: "",
          text: "FastAPI",
          marginLeft: 80
        },
        {
          y: 60,
          fill: "#e65100",
          link: "",
          text: "数据分析",
          marginLeft: 80
        }
      ]
    ]
  }
]
