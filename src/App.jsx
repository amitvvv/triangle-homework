import React from 'react'
import Router from './router.jsx'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <Router />
      </div>
    </div>
  )
}