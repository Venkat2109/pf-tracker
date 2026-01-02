import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )

  function login(token: string) {
    localStorage.setItem("token", token)
    setToken(token)
  }

  function logout() {
    localStorage.removeItem("token")
    setToken(null)
  }

  // 🔐 Auto logout on token expiry
  useEffect(() => {
    if (!token) return

    const payload = JSON.parse(atob(token.split(".")[1]))
    const expiry = payload.exp * 1000
    const timeout = expiry - Date.now()

    if (timeout <= 0) {
      logout()
    } else {
      const timer = setTimeout(logout, timeout)
      return () => clearTimeout(timer)
    }
  }, [token])

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}

