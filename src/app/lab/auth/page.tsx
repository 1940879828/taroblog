import { Note, PageHeader } from "../_components"
import styles from "./page.module.css"

type Lane = {
  id: string
  label: string
}

type Step = {
  laneId: string
  stage: number
  title: string
  body: string
  tag?: string
}

type Exchange = {
  fromLaneId: string
  fromStage: number
  toLaneId: string
  toStage: number
  label: string
}

type Diagram = {
  id: string
  title: string
  subtitle: string
  verdict: string
  lanes: Lane[]
  steps: Step[]
  exchanges: Exchange[]
  points: string[]
}

const gridMetrics = {
  headerHeight: 58,
  laneHeight: 136,
  laneWidth: 168,
  stageWidth: 194
}

const stageLabels = [
  "入口",
  "Firebase",
  "登录交换",
  "会话建立",
  "资料聚合",
  "首屏恢复",
  "后续请求",
  "登出/失效"
]

const diagrams: Diagram[] = [
  {
    id: "firebase-admin-session-cookie",
    title: "方案一：Firebase Admin session cookie",
    subtitle:
      "官方推荐的 SSR 会话模型：用 ID token 换服务端 httpOnly session cookie。",
    verdict:
      "适合 Next 首屏就要可信识别用户的应用，但不能自动替代业务后端的登录逻辑。",
    lanes: [
      { id: "browser", label: "浏览器页面" },
      { id: "firebase-client", label: "Firebase Web SDK" },
      { id: "next-server", label: "Next 后端" },
      { id: "firebase-admin", label: "Firebase Admin/Auth" },
      { id: "business-api", label: "业务后端" }
    ],
    steps: [
      {
        laneId: "browser",
        stage: 1,
        title: "点击登录",
        body: "打开第三方登录弹窗。"
      },
      {
        laneId: "firebase-client",
        stage: 2,
        title: "完成 OAuth",
        body: "拿到 currentUser，并临时读取 ID token。",
        tag: "短期 token"
      },
      {
        laneId: "next-server",
        stage: 3,
        title: "接收 ID token",
        body: "Server Action 或 Route Handler 接收一次性登录交换请求。"
      },
      {
        laneId: "firebase-admin",
        stage: 4,
        title: "创建 session cookie",
        body: "校验 ID token，然后生成 Firebase session cookie。",
        tag: "Admin SDK"
      },
      {
        laneId: "next-server",
        stage: 5,
        title: "Set-Cookie",
        body: "写入 httpOnly / Secure / SameSite cookie，JS 不能读取。"
      },
      {
        laneId: "next-server",
        stage: 6,
        title: "SSR 读 cookie",
        body: "刷新或直达页面时，服务端先验证 cookie 再渲染用户态。"
      },
      {
        laneId: "business-api",
        stage: 7,
        title: "读取业务资料",
        body: "服务端拿 uid 向业务后端查询 profile、权限、余额等。"
      },
      {
        laneId: "next-server",
        stage: 8,
        title: "清理会话",
        body: "登出时删除 cookie；敏感场景可检查 revocation。"
      }
    ],
    exchanges: [
      {
        fromLaneId: "browser",
        fromStage: 1,
        toLaneId: "firebase-client",
        toStage: 2,
        label: "OAuth 登录"
      },
      {
        fromLaneId: "firebase-client",
        fromStage: 2,
        toLaneId: "next-server",
        toStage: 3,
        label: "ID token"
      },
      {
        fromLaneId: "next-server",
        fromStage: 3,
        toLaneId: "firebase-admin",
        toStage: 4,
        label: "verify + create"
      },
      {
        fromLaneId: "firebase-admin",
        fromStage: 4,
        toLaneId: "next-server",
        toStage: 5,
        label: "session cookie"
      },
      {
        fromLaneId: "next-server",
        fromStage: 6,
        toLaneId: "business-api",
        toStage: 7,
        label: "uid 查询资料"
      },
      {
        fromLaneId: "browser",
        fromStage: 8,
        toLaneId: "next-server",
        toStage: 8,
        label: "logout"
      }
    ],
    points: [
      "最快获得可信 SSR 登录态。",
      "cookie 是新的 session，不是把 ID token 原样存 cookie。",
      "如果已有业务登录接口，仍要继续调用它，否则会绕过业务副作用。"
    ]
  },
  {
    id: "existing-backend-admin-sdk",
    title: "方案二：现有后端已经实现 Firebase Admin SDK",
    subtitle:
      "认证、用户同步、业务 session 都由现有后端完成；Next 不另建 Firebase 会话。",
    verdict:
      "适合已有完整登录后端的项目。Next 应复用它，而不是平行重做一套认证。",
    lanes: [
      { id: "browser", label: "浏览器页面" },
      { id: "firebase-client", label: "Firebase Web SDK" },
      { id: "business-api", label: "现有业务后端" },
      { id: "firebase-admin", label: "Firebase Admin/Auth" },
      { id: "next-server", label: "Next 后端" }
    ],
    steps: [
      {
        laneId: "browser",
        stage: 1,
        title: "点击登录",
        body: "页面只负责启动 Firebase 登录。"
      },
      {
        laneId: "firebase-client",
        stage: 2,
        title: "返回 ID token",
        body: "浏览器拿 token，用于调用现有登录接口。"
      },
      {
        laneId: "business-api",
        stage: 3,
        title: "执行现有登录接口",
        body: "接收 ID token，开始业务登录流水线。",
        tag: "不能跳过"
      },
      {
        laneId: "firebase-admin",
        stage: 4,
        title: "后端校验身份",
        body: "现有后端用 Admin SDK 校验 token，必要时签发 custom token。"
      },
      {
        laneId: "business-api",
        stage: 5,
        title: "同步业务用户",
        body: "创建用户、更新昵称头像、会员/权限、埋点、设备信息等。"
      },
      {
        laneId: "business-api",
        stage: 6,
        title: "返回 profile/session",
        body: "可设置业务 session cookie，也可返回业务 profile。"
      },
      {
        laneId: "next-server",
        stage: 7,
        title: "只做胶水",
        body: "SSR 或 API 需要登录态时，代理/复用现有业务 session。"
      },
      {
        laneId: "business-api",
        stage: 8,
        title: "统一登出",
        body: "调用现有登出接口，清业务 cookie 和后端 session。"
      }
    ],
    exchanges: [
      {
        fromLaneId: "browser",
        fromStage: 1,
        toLaneId: "firebase-client",
        toStage: 2,
        label: "OAuth 登录"
      },
      {
        fromLaneId: "firebase-client",
        fromStage: 2,
        toLaneId: "business-api",
        toStage: 3,
        label: "ID token"
      },
      {
        fromLaneId: "business-api",
        fromStage: 3,
        toLaneId: "firebase-admin",
        toStage: 4,
        label: "verify"
      },
      {
        fromLaneId: "firebase-admin",
        fromStage: 4,
        toLaneId: "business-api",
        toStage: 5,
        label: "claims / uid"
      },
      {
        fromLaneId: "business-api",
        fromStage: 6,
        toLaneId: "next-server",
        toStage: 7,
        label: "profile / session"
      },
      {
        fromLaneId: "browser",
        fromStage: 8,
        toLaneId: "business-api",
        toStage: 8,
        label: "logout"
      }
    ],
    points: [
      "业务后端拥有认证事实和业务副作用。",
      "Next 自建 Firebase Admin session 会形成第二套会话源。",
      "最佳做法是让 Next 复用现有后端 session 或只做代理。"
    ]
  },
  {
    id: "compromise-forward-token",
    title: "方案三：折中方案，客户端 Firebase 是唯一 token 来源",
    subtitle:
      "Next 只转发 token；Zustand persist 只缓存头像昵称；全局 Bootstrapper 恢复真实 profile。",
    verdict:
      "适合学习 demo 和迁移过渡：恢复观感接近客户端应用，同时不绕过现有后端。",
    lanes: [
      { id: "browser", label: "浏览器页面" },
      { id: "zustand", label: "Zustand persist" },
      { id: "firebase-client", label: "Firebase Web SDK" },
      { id: "next-server", label: "Next SA / Route" },
      { id: "business-api", label: "业务后端" }
    ],
    steps: [
      {
        laneId: "zustand",
        stage: 1,
        title: "读取展示缓存",
        body: "只缓存 uid、头像、昵称、展示偏好，不缓存 ID token。",
        tag: "非权限依据"
      },
      {
        laneId: "browser",
        stage: 2,
        title: "先显示 cached 用户",
        body: "全局 AuthBootstrapper 标记 restoring，减少 Guest 闪烁。"
      },
      {
        laneId: "firebase-client",
        stage: 3,
        title: "恢复 currentUser",
        body: "Firebase 客户端恢复真实登录态，并按需读取新 ID token。"
      },
      {
        laneId: "next-server",
        stage: 4,
        title: "只转发请求",
        body: "Server Action / Route Handler 带 ID token 转发给业务后端。"
      },
      {
        laneId: "business-api",
        stage: 5,
        title: "后端校验并聚合",
        body: "现有后端继续执行 Firebase 校验和用户资料逻辑。"
      },
      {
        laneId: "next-server",
        stage: 6,
        title: "返回标准 profile",
        body: "Next 只做字段归一化，不保存 Firebase Admin session。"
      },
      {
        laneId: "zustand",
        stage: 7,
        title: "覆盖缓存",
        body: "写入最新 profile；后续页面共享头像昵称和状态。"
      },
      {
        laneId: "browser",
        stage: 8,
        title: "请求时再取 token",
        body: "每次敏感请求从 Firebase helper 取实时 token，登出清缓存。"
      }
    ],
    exchanges: [
      {
        fromLaneId: "zustand",
        fromStage: 1,
        toLaneId: "browser",
        toStage: 2,
        label: "cached profile"
      },
      {
        fromLaneId: "browser",
        fromStage: 2,
        toLaneId: "firebase-client",
        toStage: 3,
        label: "恢复登录态"
      },
      {
        fromLaneId: "firebase-client",
        fromStage: 3,
        toLaneId: "next-server",
        toStage: 4,
        label: "实时 ID token"
      },
      {
        fromLaneId: "next-server",
        fromStage: 4,
        toLaneId: "business-api",
        toStage: 5,
        label: "转发 token"
      },
      {
        fromLaneId: "business-api",
        fromStage: 5,
        toLaneId: "next-server",
        toStage: 6,
        label: "profile"
      },
      {
        fromLaneId: "next-server",
        fromStage: 6,
        toLaneId: "zustand",
        toStage: 7,
        label: "更新缓存"
      },
      {
        fromLaneId: "browser",
        fromStage: 8,
        toLaneId: "firebase-client",
        toStage: 8,
        label: "getIdToken"
      }
    ],
    points: [
      "恢复速度靠展示缓存，真实权限靠后端校验。",
      "不会把 ID token 放进 Zustand/localStorage。",
      "不会跳过现有业务后端的登录、同步、登出逻辑。"
    ]
  },
  {
    id: "optimistic-zustand-id-token",
    title: "方案四：乐观 token 缓存，失败后被动续期",
    subtitle:
      "Zustand persist 同时缓存展示资料、短期 ID token 和过期时间；读请求先用缓存，401 后再让 Firebase 强制刷新并重试一次。",
    verdict:
      "这是体验最快的客户端方案，但边界必须收紧：token 不是秘密，后端仍是唯一权限裁判，敏感写操作不要只信缓存 token。",
    lanes: [
      { id: "browser", label: "浏览器页面" },
      { id: "zustand", label: "Zustand persist" },
      { id: "firebase-client", label: "Firebase Web SDK" },
      { id: "next-server", label: "Next SA / Route" },
      { id: "business-api", label: "业务后端" }
    ],
    steps: [
      {
        laneId: "zustand",
        stage: 1,
        title: "恢复缓存包",
        body: "读取 profile、cached ID token、tokenExp；不保存 refresh token。",
        tag: "短期 bearer"
      },
      {
        laneId: "browser",
        stage: 2,
        title: "立即显示用户态",
        body: "头像昵称先展示；低风险读请求可先带 cached token 发出。"
      },
      {
        laneId: "next-server",
        stage: 3,
        title: "转发 cached token",
        body: "Next 不校验、不落库，只把 token 放进后端请求头。"
      },
      {
        laneId: "business-api",
        stage: 4,
        title: "后端校验 token",
        body: "业务后端继续用 Admin SDK 校验身份和权限。"
      },
      {
        laneId: "firebase-client",
        stage: 5,
        title: "401 后强刷",
        body: "如果过期或失效，singleflight 调 currentUser.getIdToken(true)。"
      },
      {
        laneId: "next-server",
        stage: 6,
        title: "fresh token 重试",
        body: "同一个请求只自动重试一次，避免无限循环。"
      },
      {
        laneId: "zustand",
        stage: 7,
        title: "覆盖新状态",
        body: "成功后写入新 token、tokenExp、profile，后续页面共享。"
      },
      {
        laneId: "browser",
        stage: 8,
        title: "续不上则登出",
        body: "刷新失败或无 currentUser 时清空缓存，页面回到匿名态。"
      }
    ],
    exchanges: [
      {
        fromLaneId: "zustand",
        fromStage: 1,
        toLaneId: "browser",
        toStage: 2,
        label: "profile + token"
      },
      {
        fromLaneId: "browser",
        fromStage: 2,
        toLaneId: "next-server",
        toStage: 3,
        label: "读请求"
      },
      {
        fromLaneId: "next-server",
        fromStage: 3,
        toLaneId: "business-api",
        toStage: 4,
        label: "cached token"
      },
      {
        fromLaneId: "business-api",
        fromStage: 4,
        toLaneId: "firebase-client",
        toStage: 5,
        label: "401 / expired"
      },
      {
        fromLaneId: "firebase-client",
        fromStage: 5,
        toLaneId: "next-server",
        toStage: 6,
        label: "fresh token"
      },
      {
        fromLaneId: "next-server",
        fromStage: 6,
        toLaneId: "business-api",
        toStage: 6,
        label: "retry once"
      },
      {
        fromLaneId: "business-api",
        fromStage: 6,
        toLaneId: "zustand",
        toStage: 7,
        label: "data + profile"
      },
      {
        fromLaneId: "firebase-client",
        fromStage: 5,
        toLaneId: "browser",
        toStage: 8,
        label: "refresh failed"
      }
    ],
    points: [
      "用户体验最好：视觉状态和读请求都能最快启动。",
      "风险边界更高：XSS、浏览器扩展、DevTools 都可能看到 token。",
      "只适合后端严格校验、客户端请求层统一重试、敏感写操作等待 fresh token 的项目。"
    ]
  }
]

export const metadata = {
  title: "登录状态泳道图 · NextLab",
  description: "对比四种 Firebase 与 Next 登录状态方案"
}

export default function AuthLabPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        no="CHAPTER 07"
        title="登录状态泳道图"
        desc="隐去具体产品信息，对比 Firebase Admin session cookie、已有后端认证、客户端 Firebase + Next 胶水层、以及乐观 token 缓存四种登录状态方案。"
      />

      <Note title="阅读方式">
        每张图从左到右看阶段，从上到下看参与方。绿色卡片是实际动作，蓝色箭头是数据交换，灰色点阵是该泳道在此阶段没有动作。
      </Note>

      {diagrams.map((diagram) => (
        <DiagramSection diagram={diagram} key={diagram.id} />
      ))}
    </div>
  )
}

function DiagramSection({ diagram }: { diagram: Diagram }) {
  return (
    <section className="space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-5">
      <div>
        <p className="font-mono text-xs text-emerald-400">{diagram.id}</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-100">
          {diagram.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {diagram.subtitle}
        </p>
      </div>

      <SwimlaneDiagram diagram={diagram} />

      <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-100">
          <p className="font-semibold text-emerald-200">判断</p>
          <p className="mt-1 text-emerald-100/80">{diagram.verdict}</p>
        </div>
        <ul className="rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
          {diagram.points.map((point) => (
            <li className="flex gap-2" key={point}>
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SwimlaneDiagram({ diagram }: { diagram: Diagram }) {
  const width = getDiagramWidth()
  const height = getDiagramHeight(diagram)

  return (
    <div className={styles.diagramScroller}>
      <div className={styles.diagramCanvas}>
        <div className={styles.swimlaneGrid}>
          <div className={styles.sequenceHeader}>
            <p className="font-mono text-xs text-slate-500">泳道 / 阶段</p>
          </div>
          {stageLabels.map((label, index) => (
            <div className={styles.stageHeader} key={label}>
              <p className="font-mono text-xs text-emerald-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-300">{label}</p>
            </div>
          ))}

          {diagram.lanes.map((lane) => (
            <LaneRow diagram={diagram} key={lane.id} lane={lane} />
          ))}
        </div>
        <ExchangeLayer diagram={diagram} height={height} width={width} />
      </div>
    </div>
  )
}

function LaneRow({ diagram, lane }: { diagram: Diagram; lane: Lane }) {
  return (
    <>
      <div className={styles.laneHeader}>
        <p className="text-sm font-semibold text-slate-200">{lane.label}</p>
      </div>
      {stageLabels.map((_, index) => (
        <StepCell
          diagram={diagram}
          key={index}
          laneId={lane.id}
          stage={index + 1}
        />
      ))}
    </>
  )
}

function StepCell({
  diagram,
  laneId,
  stage
}: {
  diagram: Diagram
  laneId: string
  stage: number
}) {
  const step = diagram.steps.find(
    (item) => item.laneId === laneId && item.stage === stage
  )

  return (
    <div className={styles.gridCell}>
      {step ? (
        <StepCard step={step} stage={stage} />
      ) : (
        <div className={styles.emptyCell} />
      )}
    </div>
  )
}

function StepCard({ step, stage }: { step: Step; stage: number }) {
  return (
    <article className={styles.stepCard}>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-emerald-300">
          {String(stage).padStart(2, "0")}
        </span>
        {step.tag && (
          <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-200">
            {step.tag}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold text-slate-50">{step.title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-300">{step.body}</p>
    </article>
  )
}

function ExchangeLayer({
  diagram,
  height,
  width
}: {
  diagram: Diagram
  height: number
  width: number
}) {
  return (
    <svg
      aria-hidden="true"
      className={styles.exchangeLayer}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <defs>
        <marker
          id={`${diagram.id}-arrow`}
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
          viewBox="0 0 8 8"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="rgb(56 189 248)" />
        </marker>
      </defs>
      {diagram.exchanges.map((exchange) => (
        <ExchangeArrow
          diagram={diagram}
          exchange={exchange}
          key={`${exchange.fromLaneId}-${exchange.fromStage}-${exchange.toLaneId}-${exchange.toStage}`}
        />
      ))}
    </svg>
  )
}

function ExchangeArrow({
  diagram,
  exchange
}: {
  diagram: Diagram
  exchange: Exchange
}) {
  const from = getStepPoint(diagram, exchange.fromLaneId, exchange.fromStage)
  const to = getStepPoint(diagram, exchange.toLaneId, exchange.toStage)
  const label = getLabelPoint(from, to)
  const labelWidth = getLabelWidth(exchange.label)

  return (
    <g>
      <path
        className={styles.exchangeLine}
        d={getExchangePath(from, to)}
        markerEnd={`url(#${diagram.id}-arrow)`}
      />
      <rect
        className={styles.exchangeLabelBg}
        height="24"
        rx="6"
        width={labelWidth}
        x={label.x - labelWidth / 2}
        y={label.y - 13}
      />
      <text
        className={styles.exchangeLabel}
        dominantBaseline="middle"
        textAnchor="middle"
        x={label.x}
        y={label.y}
      >
        {exchange.label}
      </text>
    </g>
  )
}

function getStepPoint(diagram: Diagram, laneId: string, stage: number) {
  const laneIndex = Math.max(
    0,
    diagram.lanes.findIndex((lane) => lane.id === laneId)
  )

  return {
    x: gridMetrics.laneWidth + (stage - 0.5) * gridMetrics.stageWidth,
    y: gridMetrics.headerHeight + (laneIndex + 0.5) * gridMetrics.laneHeight
  }
}

function getExchangePath(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  const middleX = from.x + (to.x - from.x) / 2 || from.x + 48
  return `M ${from.x} ${from.y} C ${middleX} ${from.y}, ${middleX} ${to.y}, ${to.x} ${to.y}`
}

function getLabelPoint(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - 14
  }
}

function getLabelWidth(label: string) {
  return Math.min(168, Math.max(76, label.length * 12 + 28))
}

function getDiagramWidth() {
  return gridMetrics.laneWidth + stageLabels.length * gridMetrics.stageWidth
}

function getDiagramHeight(diagram: Diagram) {
  return (
    gridMetrics.headerHeight + diagram.lanes.length * gridMetrics.laneHeight
  )
}
