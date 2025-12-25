import { motion } from "framer-motion"

export default function Loading({ message = "Loading your data..." }) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{
          width: 40,
          height: 40,
          border: "4px solid var(--border)",
          borderTop: "4px solid var(--primary)",
          borderRadius: "50%",
          margin: "0 auto"
        }}
      />
      <p style={{ marginTop: 16, color: "var(--muted)" }}>{message}</p>
    </div>
  )
}
