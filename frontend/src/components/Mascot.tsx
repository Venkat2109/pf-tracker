// src/components/Mascot.tsx
import { useState } from "react"
import { motion } from "framer-motion"
import { Transaction } from "../api/transactions"
import { getMascotMessage } from "../utils/mascotBrain"

interface MascotProps {
  transactions: Transaction[]
  income: number
  expense: number
  balance: number
}

export default function Mascot({
  transactions,
  income,
  expense,
  balance
}: MascotProps) {
  const [open, setOpen] = useState(false)

  const { text, mood } = getMascotMessage({
    transactions,
    income,
    expense,
    balance
  })

  const eyeColor =
    mood === "happy"
      ? "#22c55e"
      : mood === "warning"
      ? "#ef4444"
      : "#60a5fa"

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999
      }}
    >
      {/* 💬 Speech bubble */}
      {open && (
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: 12,
            maxWidth: 260,
            fontSize: 14
          }}
        >
          {text}
        </motion.div>
      )}

      {/* 🤖 Robot */}
      <motion.div
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          width: 72,
          height: 96,
          cursor: "pointer",
          display: "grid",
          placeItems: "center"
        }}
      >
        {/* Head */}
        <div
          style={{
            width: 56,
            height: 44,
            borderRadius: 12,
            background: "var(--card)",
            border: "2px solid var(--border)",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          {/* Eyes */}
          <motion.div
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: eyeColor
            }}
          />
          <motion.div
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: eyeColor
            }}
          />
        </div>

        {/* Body */}
        <div
          style={{
            width: 40,
            height: 36,
            marginTop: 6,
            borderRadius: 10,
            background: "var(--primary)",
            opacity: 0.85
          }}
        />
      </motion.div>
    </motion.div>
  )
}
