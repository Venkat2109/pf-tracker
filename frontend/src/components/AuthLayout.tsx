// src/components/AuthLayout.tsx
import { motion } from "framer-motion"
import Mascot from "./Mascot"

export default function AuthLayout({
  title,
  subtitle,
  children
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(900px 450px at 20% -10%, #6366f1, transparent)"
      }}
    >
      {/* 🌟 BRAND HERO */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          textAlign: "center",
          pointerEvents: "none"
        }}
      >
        {/* 🟣 LOGO */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "var(--primary)",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              color: "white"
            }}
          >
            S
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800 }}>
            Spendly
          </h1>
        </div>

        <p style={{ color: "var(--muted)", fontSize: 16 }}>
          Track smarter. Save better.
        </p>

        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>
          Simple • Private • Insightful
        </p>
      </div>

      {/* 🔐 AUTH CARD */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: 380,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          zIndex: 2
        }}
      >
        <h1>{title}</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          {subtitle}
        </p>

        {children}
      </motion.div>

      {/* 🤖 AUTH MASCOT CAMEO */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          opacity: 0.65,
          pointerEvents: "none"
        }}
      >
        <Mascot transactions={[]} mode="auth" />
      </div>
    </div>
  )
}
