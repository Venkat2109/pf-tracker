import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import AuthLayout from "../components/AuthLayout"
import PageLayout from "../components/PageLayout"
import { registerUser } from "../api/auth"

export default function Register() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    try {
      await registerUser({ email, username, password })
      setSuccess(true)
      setTimeout(() => navigate("/login"), 1500)
    } catch {
      setError("User already exists or invalid data")
    }
  }

  return (
    <PageLayout variant="auth">
      <AuthLayout
        title="Create your account ✨"
        subtitle="Start building better money habits"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="button-group"
          style={{
            maxWidth: 420,
            margin: "0 auto"
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Username (display name)"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {success && (
            <p style={{ color: "var(--income)", fontSize: 14 }}>
              ✅ Account created! Redirecting…
            </p>
          )}

          {error && (
            <p style={{ color: "var(--expense)", fontSize: 14 }}>
              {error}
            </p>
          )}

          <motion.button
            style={{ width: "100%" }}
            whileTap={{ scale: 0.96 }}
          >
            Register
          </motion.button>

          <p className="label" style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </motion.form>
      </AuthLayout>
    </PageLayout>
  )
}
