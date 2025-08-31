import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function formatPoints(points) {
  return points.map(p => `${p.x},${p.y}`).join(';')
}

export default function InputPage() {
  const nav = useNavigate()
  const [pts, setPts] = useState([
    { x: 100, y: 100 },
    { x: 700, y: 150 },
    { x: 400, y: 650 },
  ])

  const update = (i, key, value) => {
    const v = Number(value)
    setPts(prev => prev.map((p, idx) => (idx === i ? { ...p, [key]: v } : p)))
  }

  const go = () => {
    const query = formatPoints(pts)
    nav(`/display?points=${encodeURIComponent(query)}`)
  }

  return (
    <section style={{ padding: 16 }}>
      {/* כותרת ממורכזת */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
           קודקודי המשולש
        </h2>
        <p style={{ fontSize: 14, color: '#475569' }}>
          הזינו שלוש נקודות (X,Y)
        </p>
      </div>

      {/* טפסי קלט */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 16,
        }}
      >
        {pts.map((p, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8 }}>
                            נקודה {i + 1}
            </div>
            <label style={{ display: 'block', fontSize: 12 }}>X</label>
            <input
              type="number"
              value={p.x}
              onChange={e => update(i, 'x', e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
            <label style={{ display: 'block', fontSize: 12 }}>Y</label>
            <input
              type="number"
              value={p.y}
              onChange={e => update(i, 'y', e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
        ))}
      </div>

      {/* כפתורים */}
      <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'center' }}>
        <button
          onClick={go}
          style={{
            padding: '8px 16px',
            borderRadius: 12,
            background: '#4f46e5',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
          }}
        >
          הצג משולש
        </button>
        <button
          onClick={() =>
            setPts([
              { x: 100, y: 100 },
              { x: 700, y: 150 },
              { x: 400, y: 650 },
            ])
          }
          style={{
            padding: '8px 16px',
            borderRadius: 12,
            background: '#e2e8f0',
            border: 'none',
            fontWeight: 600,
          }}
        >
          דוגמה
        </button>
      </div>
    </section>
  )
}
