import { motion } from "framer-motion"

export default function AuthLayout({
  title,
  subtitle,
  children
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(800px 400px at 20% -10%, #6366f1, transparent)"
      }}
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: 380 }}
      >
        <h1>{title}</h1>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          {subtitle}
        </p>
        {children}
      </motion.div>
    </div>
  )
}
