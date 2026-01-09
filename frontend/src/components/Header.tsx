import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaHome,
  FaCalendarAlt,
  FaCog,
  FaFileDownload,
  FaSignOutAlt
} from "react-icons/fa"

import { useSettings } from "../context/SettingsContext"
import { useAuth } from "../context/AuthContext"
import { getTransactions } from "../api/transactions"
import { exportToCSV } from "../utils/exportCSV"

export default function Header() {
  const { theme, toggleTheme, reduceMotion, toggleReduceMotion } =
    useSettings()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const welcomeText = user?.username
    ? `Welcome back, ${user.username} 👋`
    : "Welcome 👋"

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () =>
      document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  async function handleDownloadCSV() {
    const tx = await getTransactions()
    exportToCSV(tx)
    setOpen(false)
  }

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1>{welcomeText}</h1>

      <div style={{ display: "flex", gap: 16, position: "relative" }}>
        {[{ to: "/", icon: <FaHome /> },
          { to: "/history", icon: <FaCalendarAlt /> }].map(
          (item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={item.to}>{item.icon}</Link>
            </motion.div>
          )
        )}

        <motion.button
          className="secondary"
          aria-label="Settings"
          whileHover={{ rotate: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(o => !o)}
        >
          <FaCog />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropdownRef}
              className="card"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                right: 0,
                top: 44,
                width: 240,
                zIndex: 100
              }}
            >
              <div style={{ display: "grid", gap: 14 }}>
                <label className="label" style={{ display: "flex", gap: 10 }}>
                  <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                  />
                  Dark mode
                </label>

                <label className="label" style={{ display: "flex", gap: 10 }}>
                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={toggleReduceMotion}
                  />
                  Reduce animations
                </label>

                <hr style={{ borderColor: "var(--border)" }} />

                <button
                  className="secondary"
                  onClick={handleDownloadCSV}
                >
                  <FaFileDownload /> Download CSV
                </button>

                <button
                  className="secondary"
                  onClick={handleLogout}
                  style={{ color: "var(--expense)" }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
