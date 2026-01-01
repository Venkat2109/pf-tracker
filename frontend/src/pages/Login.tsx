import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import { loginUser } from "../api/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    try {
      const res = await loginUser({ email, password })
      localStorage.setItem("token", res.access_token)
      navigate("/")
    } catch {
      setError("Invalid email or password")
    }
  }

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Track smarter. Save better."
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

        <button style={{ width: "100%" }}>Login</button>

        <p className="label" style={{ textAlign: "center" }}>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
