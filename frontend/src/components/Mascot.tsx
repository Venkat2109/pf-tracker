// src/components/Mascot.tsx
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Transaction } from "../api/transactions"
import { getMascotMessages } from "../utils/mascotBrain"

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
  const [index, setIndex] = useState(0)

  /* 🧠 Generate all valid messages once */
  const messages = useMemo(
    () =>
      getMascotMessages({
        transactions,
        income,
        expense,
        balance
      }),
    [transactions, income, expense, balance]
  )

  const current = messages[index % messages.length]

  /* 🎨 Mood-aware visuals */
  const eyeColor =
    current.mood === "happy"
      ? "#22c55e"
      : current.mood === "warning"
      ? "#ef4444"
      : "#60a5fa"

  const bodyGlow =
    current.mood === "warning"
      ? "0 0 14px rgba(239,68,68,0.6)"
      : current.mood === "happy"
      ? "0 0 14px rgba(34,197,94,0.6)"
      : "0 0 10px rgba(96,165,250,0.45)"

  function handleClick() {
    setOpen(true)
    setIndex(i => i + 1) // 🔁 rotate message
  }

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
          key={index} // forces animation per message
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
              📅 Reviewing your past spending
            </div>
          )}

          {current.text}
        </motion.div>
      )}

      {/* 🤖 ROBOT */}
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -6, 0],
          rotate:
            current.mood === "warning"
              ? [0, -2, 2, 0]
              : 0
        }}
        transition={{
          repeat: Infinity,
          duration: current.mood === "warning" ? 1.6 : 2
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
              animate={{ scaleY: [1, 0.15, 1] }}
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
          animate={{ boxShadow: bodyGlow }}
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
