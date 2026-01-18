import { motion } from "framer-motion"

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
          "radial-gradient(800px 400px at 20% -10%, #6366f1, transparent)"
      }}
    >
      {/* 🌟 BRANDING / HERO AREA */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          textAlign: "center",
          pointerEvents: "none"
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 8,
            letterSpacing: -0.5
          }}
        >
          Spendly
        </h1>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 16,
            marginBottom: 16
          }}
        >
          Track smarter. Save better.
        </p>

        <p
          style={{
            color: "var(--muted)",
            fontSize: 13
          }}
        >
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

      {/* 🌫️ SUBTLE FOOTER FILL */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          fontSize: 12,
          color: "var(--muted)",
          textAlign: "center"
        }}
      >
        Your friendly money assistant 🤖
      </div>
    </div>
  )
}
