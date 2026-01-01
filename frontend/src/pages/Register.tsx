import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { registerUser } from "../api/auth"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    try {
      await registerUser({ email, password })
      navigate("/login")
    } catch {
      setError("User already exists or invalid data")
    }
  }

  return (
    <AuthLayout
      title="Create your account ✨"
      subtitle="Start building better money habits"
    >
      <form onSubmit={handleSubmit} className="button-group">
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
          <p style={{ color: "var(--expense)", fontSize: 14 }}>
            {error}
          </p>
        )}

        <button style={{ width: "100%" }}>Register</button>

        <p className="label" style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
