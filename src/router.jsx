import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import InputPage from './pages/InputPage.jsx'
import DisplayPage from './pages/DisplayPage.jsx'

export default function Router() {
  return (
    <>
      <header style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        marginBottom: 20, padding:'10px 14px', borderRadius:12,
        background:'#ffffffcc', boxShadow:'0 1px 6px rgba(0,0,0,0.06)', backdropFilter:'blur(6px)'
      }}>
        <Link to="/" style={{ fontWeight:800, color:'#0f172a', textDecoration:'none' }}>
          ▲ Triangle
        </Link>
        <nav style={{ display:'flex', gap: 12 }}>
          <Link to="/input" style={{ textDecoration:'none' }}>קלט</Link>
          <Link to="/display" style={{ textDecoration:'none' }}>תצוגה</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/display" element={<DisplayPage />} />
      </Routes>
    </>
  )
}
