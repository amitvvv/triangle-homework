import React, { useMemo } from "react";
import "../styles/triangle.css";

/* ===== התאמה למסגרת 800×800 ===== */
function bbox(points) {
  const xs = points.map(p => p.x), ys = points.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  return { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY };
}
function fitTransform(points, targetW = 800, targetH = 800, pad = 40) {
  const { minX, minY, w, h } = bbox(points);
  const sw = w || 1, sh = h || 1;
  const s  = Math.min((targetW - 2 * pad) / sw, (targetH - 2 * pad) / sh);
  return { s, tx: pad - minX * s, ty: pad - minY * s };
}
function applyTransform(p, t) {
  return { x: p.x * t.s + t.tx, y: p.y * t.s + t.ty };
}

/* ===== גיאומטריה ===== */
const add   = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const sub   = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const dot   = (a, b) => a.x * b.x + a.y * b.y;
const cross = (a, b) => a.x * b.y - a.y * b.x;
const mag   = (v) => Math.hypot(v.x, v.y);
const norm  = (v) => { const m = mag(v) || 1; return { x: v.x / m, y: v.y / m }; };
const scale = (v, s) => ({ x: v.x * s, y: v.y * s });
const sum   = (arr) => arr.reduce((a, b) => a + b, 0);

function angleDeg(u, v) {
  const mu = mag(u), mv = mag(v);
  if (mu === 0 || mv === 0) return 0;
  let c = dot(u, v) / (mu * mv);
  c = Math.max(-1, Math.min(1, c));
  return (Math.acos(c) * 180) / Math.PI;
}
function angleAt(A, B, C) { return angleDeg(sub(B, A), sub(C, A)); }
function bisectorDir(A, B, C) {
  const u = norm(sub(B, A));
  const v = norm(sub(C, A));
  const w = add(u, v);
  const m = mag(w);
  if (m < 1e-6) return { x: -u.y, y: u.x };
  return norm(w);
}
function labelPos(A, B, C, r, extra = 22) {
  const dir = bisectorDir(A, B, C);
  return add(A, scale(dir, r + extra));
}
function arcPath(A, B, C, r) {
  const u = norm(sub(B, A));
  const v = norm(sub(C, A));
  const p1 = add(A, scale(u, r));
  const p2 = add(A, scale(v, r));
  const sweep = cross(u, v) > 0 ? 1 : 0;
  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
}

export default function TriangleView({ points, animate = false }) {
  if (!Array.isArray(points) || points.length !== 3) return null;
  const bad = points.some(p => p == null || Number.isNaN(p.x) || Number.isNaN(p.y));
  if (bad) return null;

  const target = { w: 800, h: 800, pad: 40 };
  const tf = useMemo(() => fitTransform(points, target.w, target.h, target.pad), [points]);
  const [A, B, C] = points.map(p => applyTransform(p, tf));

  const angles  = [ angleAt(A, B, C), angleAt(B, C, A), angleAt(C, A, B) ];
  const sides   = [ mag(sub(B, A)), mag(sub(C, B)), mag(sub(A, C)) ];
  const minSide = Math.min(...sides);
  const r       = Math.max(18, Math.min(50, minSide * 0.18));

  const arcA = arcPath(A, B, C, r);
  const arcB = arcPath(B, C, A, r);
  const arcC = arcPath(C, A, B, r);

  const labA = labelPos(A, B, C, r);
  const labB = labelPos(B, C, A, r);
  const labC = labelPos(C, A, B, r);

  const pretty = (x) => x.toFixed(1);
  const poly   = `${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`;
  const arcCls = animate ? "angle-arc animated" : "angle-arc"; // אנימציה רק לקשתות

  return (
    <div style={{ overflow:"auto", background:"#fff", borderRadius:12, boxShadow:"0 1px 4px rgba(0,0,0,0.08)", display:"inline-block" }}>
      <svg width={800} height={800} viewBox={`0 0 ${target.w} ${target.h}`} role="img" aria-label="Triangle with angles">
        {/* רקע + מסגרת */}
        <rect x={0} y={0} width={target.w} height={target.h} fill="#ffffff" stroke="#e2e8f0" />

        {/* המשולש (סטטי) */}
        <polygon points={poly} fill="rgba(79,70,229,0.18)" stroke="#0f172a" strokeWidth={2} />

        {/* קשתות זווית (עם/בלי אנימציה) */}
        <path d={arcA} className={arcCls} stroke="#334155" strokeWidth={2} fill="none" />
        <path d={arcB} className={arcCls} stroke="#334155" strokeWidth={2} fill="none" />
        <path d={arcC} className={arcCls} stroke="#334155" strokeWidth={2} fill="none" />

        {/* תוויות ערכי הזווית */}
        <text x={labA.x} y={labA.y} fontSize={14} textAnchor="middle" dominantBaseline="middle" fill="#0f172a">
          {pretty(angles[0])}°
        </text>
        <text x={labB.x} y={labB.y} fontSize={14} textAnchor="middle" dominantBaseline="middle" fill="#0f172a">
          {pretty(angles[1])}°
        </text>
        <text x={labC.x} y={labC.y} fontSize={14} textAnchor="middle" dominantBaseline="middle" fill="#0f172a">
          {pretty(angles[2])}°
        </text>

        {/* נקודות קדקוד */}
        {[A,B,C].map((p,i)=>(
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={6} fill="#0ea5e9" />
            <circle cx={p.x} cy={p.y} r={2.5} fill="#0f172a" />
          </g>
        ))}
      </svg>

      <div style={{ fontSize:14, padding:12, textAlign:"center" }}>
        סכום זוויות: <strong>{pretty(sum(angles))}°</strong> (≈ 180°)
      </div>
    </div>
  );
}
