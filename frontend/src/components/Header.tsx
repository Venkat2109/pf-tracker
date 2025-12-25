import { useState } from "react"
import { Link } from "react-router-dom"
import { FaHome, FaCalendarAlt, FaCog } from "react-icons/fa"
import { useSettings } from "../context/SettingsContext"

export default function Header() {
  const { theme, toggleTheme, reduceMotion, toggleReduceMotion } =
    useSettings()

  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40
      }}
    >
      {/* LEFT: App Title */}
      <h1 style={{ margin: 0 }}>PF Tracker</h1>

      {/* RIGHT: Navigation + Settings */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          position: "relative"
        }}
      >
        {/* Dashboard */}
        <Link
          to="/"
          title="Dashboard"
          style={{
            fontSize: 18,
            color: "var(--text)",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FaHome />
        </Link>

        {/* History / Calendar */}
        <Link
          to="/history"
          title="Transaction History & Calendar"
          style={{
            fontSize: 18,
            color: "var(--text)",
            display: "flex",
            alignItems: "center"
          }}
        >
          <FaCalendarAlt />
        </Link>

        {/* Settings Button */}
        <button
          className="secondary"
          onClick={() => setOpen(o => !o)}
          aria-label="Settings"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10
          }}
        >
          <FaCog />
        </button>

        {/* SETTINGS DROPDOWN */}
        {open && (
          <div
            className="card"
            style={{
              position: "absolute",
              right: 0,
              top: 52,
              width: 240,
              zIndex: 20
            }}
          >
            <div style={{ display: "grid", gap: 16 }}>
              <label
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                Dark mode
              </label>

              <label
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={toggleReduceMotion}
                />
                Reduce animations
              </label>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
