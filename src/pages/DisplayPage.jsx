import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import TriangleView from "../components/TriangleView.jsx";

function parsePoints(qs) {
  const raw = new URLSearchParams(qs).get("points");
  if (!raw) return { ok: false, reason: "missing" };
  const parts = raw.split(";").map(p => p.split(",").map(Number));
  if (parts.length !== 3) return { ok: false, reason: "format" };
  const points = parts.map(([x, y]) => ({ x: Number(x), y: Number(y) }));
  const bad = points.some(p => Number.isNaN(p.x) || Number.isNaN(p.y));
  if (bad) return { ok: false, reason: "nan" };
  return { ok: true, points };
}

export default function DisplayPage() {
  const { search } = useLocation();
  const result = useMemo(() => parsePoints(search), [search]);
  const [animate, setAnimate] = useState(true);

  if (!result.ok) {
    return (
      <section style={{ padding: 16, minHeight: 220, display: "grid", placeItems: "center" }}>
        <div style={{ background: "#fff", padding: 16, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>אין נקודות תקינות לתצוגה</div>
          <div style={{ fontSize: 14, color: "#475569", marginBottom: 10 }}>
            {result.reason === "missing" && "לא נשלח פרמטר points ב־URL."}
            {result.reason === "format"  && "פורמט לא תקין. צורה: x1,y1;x2,y2;x3,y3"}
            {result.reason === "nan"     && "אחד הערכים אינו מספר (NaN)."}
          </div>
          <div style={{ fontSize: 13 }}>
            חזור ל־<Link to="/input">עמוד הקלט</Link>.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 6 }}>עמוד תצוגה – משולש וזוויות</div>
        <div style={{ fontSize: 13, color: "#475569" }}>אזור שרטוט: 800×800. הקואורדינטות עוברות התאמה עם שוליים.</div>
      </div>

      <div style={{ display:"flex", justifyContent:"center", marginBottom: 12 }}>
        <button
          onClick={() => setAnimate(a => !a)}
          style={{
            padding: "8px 14px",
            borderRadius: 12,
            background: animate ? "#0ea5e9" : "#e2e8f0",
            color: animate ? "#fff" : "#0f172a",
            border: "none",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            cursor: "pointer"
          }}
          title="הדגש קשתות זווית באנימציה"
        >
          {animate ? "כבה הדגשת קשת " : "הדגש קשת  "}
        </button>
      </div>

      <div style={{ textAlign:"center" }}>
        <TriangleView points={result.points} animate={animate} />
      </div>
    </section>
  );
}
