import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({
  children
}: {
  children: JSX.Element
}) {
  const { token, isAuthReady } = useAuth()

  // ⏳ Wait until auth is initialized
  if (!isAuthReady) {
    return null // or loading spinner if you want
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
