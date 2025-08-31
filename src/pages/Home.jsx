import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const sample = encodeURIComponent("100,100;700,150;400,650");
  return (
    <section style={{
      minHeight:'60vh',
      padding:'40px 0',
      borderRadius:16,
      background:'radial-gradient(1200px 600px at 80% -10%, rgba(99,102,241,0.25), transparent), linear-gradient(180deg, #ecfeff 0%, #f8fafc 60%)',
      textAlign:'center'
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 24px' }}>
        <h1 style={{ fontSize:40, margin:'0 0 12px' }}>Triangle Angle Viewer</h1>
        <p style={{ fontSize:16, margin:'0 0 24px' }}>
          .הזן שלוש נקודות וצפה במשולש, בקשתות הזווית ובערכי הזוויות — בחדות וקטורית
        </p>

        <div style={{ display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center' }}>
          <Link to="/input" style={btnPrimary}>התחל בהזנת נקודות</Link>
          <Link to={`/display?points=${sample}`} style={btnGhost}>דוגמה מהירה</Link>
        </div>
      </div>
    </section>
  );
}

const btnPrimary = {
  padding:'10px 16px', borderRadius:12, background:'#4f46e5', color:'#fff', textDecoration:'none',
  boxShadow:'0 2px 8px rgba(79,70,229,0.35)', fontWeight:600
};
const btnGhost = {
  padding:'10px 16px', borderRadius:12, background:'#ffffffb3', color:'#0f172a', textDecoration:'none',
  border:'1px solid #e2e8f0', fontWeight:600
};
