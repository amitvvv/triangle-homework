export function add(a, b) { return { x: a.x + b.x, y: a.y + b.y } }
export function sub(a, b) { return { x: a.x - b.x, y: a.y - b.y } }
export function dot(a, b) { return a.x * b.x + a.y * b.y }
export function cross(a, b) { return a.x * b.y - a.y * b.x }
export function mag(v) { return Math.hypot(v.x, v.y) }
export function norm(v) { const m = mag(v) || 1; return { x: v.x / m, y: v.y / m } }
export function scale(v, s) { return { x: v.x * s, y: v.y * s } }
export function sum(arr) { return arr.reduce((a, b) => a + b, 0) }

export function angleDeg(u, v) {
  const mu = mag(u), mv = mag(v)
  if (mu === 0 || mv === 0) return 0
  let c = dot(u, v) / (mu * mv)
  c = Math.max(-1, Math.min(1, c))
  return (Math.acos(c) * 180) / Math.PI
}

export function angleAt(A, B, C) {
  return angleDeg(sub(B, A), sub(C, A))
}

export function bisectorDir(A, B, C) {
  const u = norm(sub(B, A))
  const v = norm(sub(C, A))
  const w = add(u, v)
  const m = mag(w)
  if (m < 1e-6) {
    return { x: -u.y, y: u.x }
  }
  return norm(w)
}

export function labelPos(A, B, C, r, extra = 22) {
  const dir = bisectorDir(A, B, C)
  return add(A, scale(dir, r + extra))
}

export function arcPath(A, B, C, r) {
  const u = norm(sub(B, A))
  const v = norm(sub(C, A))
  const p1 = add(A, scale(u, r))
  const p2 = add(A, scale(v, r))
  const sweep = cross(u, v) > 0 ? 1 : 0
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
}
