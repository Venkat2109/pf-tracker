import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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

  /* 🔹 Welcome text logic */
  const welcomeText = user?.username
    ? `Welcome back, ${user.username} 👋`
    : "Welcome 👋"

  /* 🔹 Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  /* 🔹 Download CSV */
  async function handleDownloadCSV() {
    const tx = await getTransactions()
    exportToCSV(tx)
    setOpen(false)
  }

  /* 🔐 Logout */
  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header>
      {/* LEFT */}
      <h1>{welcomeText}</h1>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "relative"
        }}
      >
        <Link to="/" title="Dashboard">
          <FaHome />
        </Link>

        <Link to="/history" title="History & Calendar">
          <FaCalendarAlt />
        </Link>

        <button
          className="secondary"
          aria-label="Settings"
          onClick={() => setOpen(o => !o)}
        >
          <FaCog />
        </button>

        {open && (
          <div
            ref={dropdownRef}
            className="card"
            style={{
              position: "absolute",
              right: 0,
              top: 44,
              width: 240,
              zIndex: 100
            }}
          >
            <div style={{ display: "grid", gap: 14 }}>
              {/* Theme */}
              <label className="label" style={{ display: "flex", gap: 10 }}>
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={() => {
                    toggleTheme()
                    setOpen(false)
                  }}
                />
                Dark mode
              </label>

              {/* Reduce motion */}
              <label className="label" style={{ display: "flex", gap: 10 }}>
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={() => {
                    toggleReduceMotion()
                    setOpen(false)
                  }}
                />
                Reduce animations
              </label>

              <hr style={{ borderColor: "var(--border)" }} />

              {/* CSV Export */}
              <button
                className="secondary"
                onClick={handleDownloadCSV}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <FaFileDownload />
                Download CSV
              </button>

              {/* Logout */}
              <button
                className="secondary"
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--expense)"
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
