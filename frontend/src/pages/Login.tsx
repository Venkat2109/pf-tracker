import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import AuthLayout from "../components/AuthLayout"
import { loginUser } from "../api/auth"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await loginUser({ email, password })
      login(res.access_token)
      navigate("/")
    } catch {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back 👋" subtitle="Track smarter. Save better.">
      <motion.form
        onSubmit={handleSubmit}
        className="button-group"
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
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && (
          <motion.p
            style={{ color: "var(--expense)", fontSize: 14 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <motion.button
          style={{ width: "100%" }}
          disabled={loading}
          whileTap={{ scale: 0.96 }}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <p className="label" style={{ textAlign: "center" }}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </motion.form>
    </AuthLayout>
  )
}
