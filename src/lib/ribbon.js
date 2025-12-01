export const init = (id) => {
  // 服务端渲染时直接返回
  if (typeof document === 'undefined' || typeof window === 'undefined' || typeof navigator === 'undefined') {
    return
  }
  
  const contain = document.getElementById(id)
  if (!contain) return
  
  if (
    "false" === contain.getAttribute("mobile") &&
    /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)
  )
    return
  const e = {
    z: n(contain, "zIndex", -3),
    a: n(contain, "alpha", 0.6),
    s: n(contain, "size", 90),
    c: contain.getAttribute("data-click")
  }
  function n(t, e, n) {
    return Number(t.getAttribute(e)) || n
  }
  const i = document.createElement("canvas")
  const o = i.getContext("2d")
  // 服务端渲染时使用默认值
  const c = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
  const a = typeof window !== 'undefined' ? window.innerWidth : 1920
  const l = typeof window !== 'undefined' ? window.innerHeight : 1080
  const d = e.s
  let r
  let s
  const u = Math
  let h = 0
  const g = 2 * u.PI
  const f = u.cos
  const m = u.random
  function x() {
    for (
      o.clearRect(0, 0, a, l),
        r = [
          { x: 0, y: 0.7 * l + d },
          { x: 0, y: 0.7 * l - d }
        ];
      r[1].x < a + d;
    )
      y(r[0], r[1])
  }
  function y(t, e) {
    o.beginPath(), o.moveTo(t.x, t.y), o.lineTo(e.x, e.y)
    const n = e.x + (2 * m() - 0.25) * d
    const i = b(e.y)
    o.lineTo(n, i),
      o.closePath(),
      (h -= g / -50),
      (o.fillStyle = `#${(((127 * f(h) + 128) << 16) | ((127 * f(h + g / 3) + 128) << 8) | (127 * f(h + (g / 3) * 2) + 128)).toString(16)}`),
      o.fill(),
      (r[0] = r[1]),
      (r[1] = { x: n, y: i })
  }
  function b(t) {
    return (s = t + (2 * m() - 1.1) * d), s > l || s < 0 ? b(t) : s
  }
  ;(i.width = a * c),
    (i.height = l * c),
    o.scale(c, c),
    (o.globalAlpha = e.a),
    (i.style.cssText = `opacity: ${e.a};position:fixed;top:0;left:0;z-index: ${e.z};width:100%;height:100%;pointer-events:none;`),
    contain.appendChild(i),
    "false" !== e.c && ((document.onclick = x), (document.ontouchstart = x)),
    x()
}
