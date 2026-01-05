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

  const message = getMascotMessage({
    transactions,
    income,
    expense,
    balance
  })

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
      {/* Speech bubble */}
      {open && (
        <div
          className="card"
          style={{
            marginBottom: 12,
            maxWidth: 240,
            fontSize: 14
          }}
        >
          {message}
        </div>
      )}

      {/* Robot */}
      <motion.div
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          width: 72,
          height: 90,
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
          <div className="mascot-eye" />
          <div className="mascot-eye" />
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
