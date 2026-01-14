// src/components/Mascot.tsx
import { useState } from "react"
import { motion } from "framer-motion"
import { Transaction } from "../api/transactions"
import { getMascotMessage } from "../utils/mascotBrain"

interface MascotProps {
  transactions: Transaction[]
  income?: number
  expense?: number
  balance?: number

  /** 🆕 Context */
  mode?: "dashboard" | "history"
}

export default function Mascot({
  transactions,
  income = 0,
  expense = 0,
  balance = 0,
  mode = "dashboard"
}: MascotProps) {
  const [open, setOpen] = useState(false)

  const { text, mood } = getMascotMessage({
    transactions,
    income,
    expense,
    balance
  })

  /* 🎨 Mood-aware visuals */
  const eyeColor =
    mood === "happy"
      ? "#22c55e"
      : mood === "warning"
      ? "#ef4444"
      : "#60a5fa"

  const bodyGlow =
    mood === "warning"
      ? "0 0 12px rgba(239,68,68,0.6)"
      : mood === "happy"
      ? "0 0 12px rgba(34,197,94,0.6)"
      : "0 0 8px rgba(96,165,250,0.4)"

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999
      }}
    >
      {/* 💬 SPEECH BUBBLE */}
      {open && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: 12,
            maxWidth: 280,
            fontSize: 14
          }}
        >
          {/* 🧠 Context hint */}
          {mode === "history" && (
            <div
              style={{
                fontSize: 11,
                color: "var(--muted)",
                marginBottom: 6
              }}
            >
              📅 Looking at your history
            </div>
          )}

          {text}
        </motion.div>
      )}

      {/* 🤖 ROBOT */}
      <motion.div
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -6, 0],
          rotate:
            mood === "warning"
              ? [0, -2, 2, 0]
              : 0
        }}
        transition={{
          repeat: Infinity,
          duration: mood === "warning" ? 1.6 : 2
        }}
        style={{
          width: 72,
          height: 96,
          cursor: "pointer",
          display: "grid",
          placeItems: "center"
        }}
      >
        {/* HEAD */}
        <div
          style={{
            width: 56,
            height: 44,
            borderRadius: 12,
            background: "var(--card-bg)",
            border: "2px solid var(--border)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {/* 👀 Eyes */}
          {[0, 1].map(i => (
            <motion.div
              key={i}
              animate={{ scaleY: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: eyeColor
              }}
            />
          ))}
        </div>

        {/* BODY */}
        <motion.div
          animate={{
            boxShadow: bodyGlow
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: 40,
            height: 36,
            marginTop: 6,
            borderRadius: 10,
            background: "var(--primary)",
            opacity: 0.9
          }}
        />
      </motion.div>
    </motion.div>
  )
}
