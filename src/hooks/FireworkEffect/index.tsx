// @ts-ignore
import anime from "animejs"
import React, { useCallback, useEffect, useRef } from "react"

const ClickEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const numberOfParticules = useRef(30)
  const colors = useRef(["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"])
  const pointer = useRef({ x: 0, y: 0 })
  const animationRef = useRef<any>(null)

  // 防抖函数
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }, [])

  // 更新坐标
  const updateCoords = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      pointer.current = {
        x: clientX - canvas.getBoundingClientRect().left,
        y: clientY - canvas.getBoundingClientRect().top
      }
    },
    [canvasRef]
  )

  // 设置粒子方向
  const setParticuleDirection = useCallback((pos: { x: number; y: number }) => {
    const angle = (anime.random(0, 360) * Math.PI) / 180
    //粒子扩散半径
    const radius = anime.random(30, 100)
    const direction = [-1, 1][anime.random(0, 1)] * radius

    return {
      x: pos.x + direction * Math.cos(angle),
      y: pos.y + direction * Math.sin(angle)
    }
  }, [])

  // 创建粒子
  const createParticule = useCallback(
    (x: number, y: number) => {
      const particule = {
        x,
        y,
        color: colors.current[anime.random(0, colors.current.length - 1)],
        // 粒子初始大小
        radius: anime.random(24, 48),
        endPos: { x: 0, y: 0 },
        draw: () => {}
      }

      particule.endPos = setParticuleDirection(particule)
      particule.draw = () => {
        if (!ctxRef.current) return
        ctxRef.current.beginPath()
        ctxRef.current.arc(
          particule.x,
          particule.y,
          particule.radius,
          0,
          2 * Math.PI
        )
        ctxRef.current.fillStyle = particule.color
        ctxRef.current.fill()
      }

      return particule
    },
    [setParticuleDirection]
  )

  // 渲染粒子
  const renderParticule = useCallback((anim: any) => {
    anim.animatables.forEach((animatable: any) => {
      animatable.target.draw()
    })
  }, [])

  // 动画效果
  const animateParticules = useCallback(
    (x: number, y: number) => {
      const particules = Array.from(
        { length: numberOfParticules.current },
        () => createParticule(x, y)
      )

      anime
        .timeline()
        .add({
          targets: particules,
          x: (p: any) => p.endPos.x,
          y: (p: any) => p.endPos.y,
          radius: 0.1,
          // 粒子动画持续时间
          duration: anime.random(800, 1200),
          easing: "easeOutExpo",
          update: renderParticule
        })
        .add({
          // 外圈扩散半径
          radius: anime.random(50, 90),
          lineWidth: 0,
          alpha: {
            value: 0,
            easing: "linear",
            duration: anime.random(600, 800)
          },
          duration: anime.random(1200, 1800),
          easing: "easeOutExpo",
          update: renderParticule,
          offset: 0
        })
    },
    [createParticule, renderParticule]
  )

  // 设置画布尺寸
  const setCanvasSize = useCallback(
    debounce(() => {
      const canvas = canvasRef.current
      if (!canvas || typeof window === 'undefined') return

      canvas.width = 2 * window.innerWidth
      canvas.height = 2 * window.innerHeight
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(2, 2)
        ctxRef.current = ctx
      }
    }, 500),
    [canvasRef, debounce]
  )

  // 点击处理
  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement
      if (
        ["A", "IMG"].includes(target.nodeName) ||
        ["sidebar", "toggle-sidebar"].includes(target.id)
      )
        return

      updateCoords(e)
      animateParticules(pointer.current.x, pointer.current.y)
    },
    [animateParticules, updateCoords]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // 初始化画布
    setCanvasSize()
    ctxRef.current = canvas.getContext("2d")

    // 设置持续清除画布的动画
    animationRef.current = anime({
      duration: Number.POSITIVE_INFINITY,
      update: () => {
        if (ctxRef.current) {
          ctxRef.current.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    })

    // 事件监听
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", setCanvasSize)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("touchstart", handleClick)

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", setCanvasSize)
      }
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
      if (animationRef.current) animationRef.current.pause()
    }
  }, [canvasRef, handleClick, setCanvasSize])

  return (
    <canvas
      ref={canvasRef}
      className="fireworks"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999
      }}
    />
  )
}

export default ClickEffect
