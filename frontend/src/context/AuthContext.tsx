import { createContext, useContext, useEffect, useState } from "react"

type UserInfo = {
  username?: string | null
}

type AuthContextType = {
  token: string | null
  user: UserInfo | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>(null!)

function decodeToken(token: string): UserInfo {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return {
      username: payload.username ?? null
    }
  } catch {
    return {}
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [user, setUser] = useState<UserInfo | null>(
    token ? decodeToken(token) : null
  )

  function login(token: string) {
    localStorage.setItem("token", token)
    setToken(token)
    setUser(decodeToken(token))
  }

  function logout() {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  // 🔐 Auto logout on expiry
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
    <AuthContext.Provider value={{ token, user, login, logout }}>
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
