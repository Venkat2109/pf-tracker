import { useState } from "react"

export default function SettingsMenu() {
  const [open, setOpen] = useState(false)

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme")
    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    )
  }

  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)}>⚙ Settings</button>

      {open && (
        <div
          className="card"
          style={{
            position: "absolute",
            right: 0,
            top: 45,
            width: 200,
            zIndex: 10
          }}
        >
          <p style={{ cursor: "pointer" }} onClick={toggleTheme}>
            🌗 Toggle Dark Mode
          </p>

          <p style={{ cursor: "pointer", marginTop: 10 }}>
            🧹 Clear Inputs (coming soon)
          </p>

          <p style={{ cursor: "pointer", marginTop: 10 }}>
            📅 Monthly View (coming soon)
          </p>
        </div>
      )}
    </div>
  )
}
