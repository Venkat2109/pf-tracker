// src/components/Mascot.tsx
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Transaction } from "../api/transactions"
import { useSettings } from "../context/SettingsContext"
import {
  getMascotMessages,
  MascotMood
} from "../utils/mascotBrain"

interface MascotProps {
  transactions: Transaction[]
  income?: number
  expense?: number
  balance?: number
  mode?: "dashboard" | "history"
}

const AUTO_HIDE_MS = 6000

export default function Mascot({
  transactions,
  income = 0,
  expense = 0,
  balance = 0,
  mode = "dashboard"
}: MascotProps) {
  const { showMascot } = useSettings()
  if (!showMascot) return null

  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [index, setIndex] = useState(0)

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

  if (messages.length === 0) return null

  const current = messages[index % messages.length]

  /* ⏳ Auto-hide */
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      setOpen(false)
      setCollapsed(true)
    }, AUTO_HIDE_MS)
    return () => clearTimeout(t)
  }, [open])

  function handleActivate() {
    setCollapsed(false)
    setOpen(true)
    setIndex(i => (i + 1) % messages.length)
  }

  function getEyeColor(mood: MascotMood) {
    if (mood === "happy") return "#22c55e"
    if (mood === "warning") return "#ef4444"
    return "#60a5fa"
  }

  function getBodyGlow(mood: MascotMood) {
    if (mood === "warning")
      return "0 0 14px rgba(239,68,68,0.6)"
    if (mood === "happy")
      return "0 0 14px rgba(34,197,94,0.6)"
    return "0 0 10px rgba(96,165,250,0.45)"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999
      }}
    >
      {/* 🔘 COLLAPSED BUTTON */}
      {collapsed && (
        <motion.button
          className="mascot-toggle"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleActivate}
        >
          🤖
        </motion.button>
      )}

      {/* 💬 ACTIVE MASCOT */}
      {!collapsed && (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{
                  marginBottom: 12,
                  maxWidth: 280,
                  fontSize: 14,
                  position: "relative"
                }}
              >
                {/* ❌ Minimise */}
                <button
                  className="mascot-minimize"
                  onClick={() => {
                    setOpen(false)
                    setCollapsed(true)
                  }}
                >
                  –
                </button>

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
          </AnimatePresence>

          {/* 🤖 BODY */}
          <motion.div
            onClick={handleActivate}
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
              {[0, 1].map(i => (
                <motion.div
                  key={i}
                  animate={{ scaleY: [1, 0.15, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: getEyeColor(current.mood)
                  }}
                />
              ))}
            </div>

            <motion.div
              animate={{ boxShadow: getBodyGlow(current.mood) }}
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
        </>
      )}
    </motion.div>
  )
}
