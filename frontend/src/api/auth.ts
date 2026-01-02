const API_BASE = "http://localhost:8000/api/v1/auth"

export async function loginUser(data: {
  email: string
  password: string
}) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error("Invalid credentials")
  }

  return res.json() // { access_token }
}

export async function registerUser(data: {
  email: string
  password: string
  username?: string // 👈 optional for backward compatibility
}) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error("Registration failed")
  }

  return res.json()
}
