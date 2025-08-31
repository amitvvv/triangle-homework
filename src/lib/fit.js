export function bbox(points) {
  const xs = points.map(p => p.x), ys = points.map(p => p.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY }
}

export function fitTransform(points, targetW = 800, targetH = 800, pad = 40) {
  const { minX, minY, w, h } = bbox(points)
  const sw = w || 1, sh = h || 1
  const sx = (targetW - 2 * pad) / sw
  const sy = (targetH - 2 * pad) / sh
  const s = Math.min(sx, sy)
  const tx = pad - minX * s
  const ty = pad - minY * s
  return { s, tx, ty }
}

export function applyTransform(p, t) {
  return { x: p.x * t.s + t.tx, y: p.y * t.s + t.ty }
}
