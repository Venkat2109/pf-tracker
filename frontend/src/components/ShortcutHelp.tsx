import { motion } from "framer-motion"

export default function ShortcutHelp({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="card"
      style={{
        position: "fixed",
        inset: 0,
        margin: "auto",
        maxWidth: 480,
        zIndex: 100,
        background: "var(--card-bg)"
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <h2>Keyboard Shortcuts ⌨️</h2>

      <ul style={{ marginTop: 16, lineHeight: 1.8 }}>
        <li><b>← / →</b> — Change month</li>
        <li><b>Home</b> — Current month</li>
        <li><b>Ctrl + N</b> — Add transaction</li>
        <li><b>Ctrl + D</b> — Toggle dark mode</li>
        <li><b>Ctrl + E</b> — Export CSV</li>
        <li><b>Ctrl + H</b> — Dashboard</li>
        <li><b>Ctrl + Shift + H</b> — History</li>
        <li><b>Esc</b> — Close modal</li>
        <li><b>?</b> — Show this help</li>
      </ul>

      <button style={{ marginTop: 16 }} onClick={onClose}>
        Close
      </button>
    </motion.div>
  )
}
