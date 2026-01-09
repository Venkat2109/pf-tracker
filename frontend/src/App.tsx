import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Dashboard from "./pages/Dashboard"
import HistoryPage from "./pages/HistoryPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import PageTransition from "./components/PageTransition"

import { AuthProvider } from "./context/AuthContext"
import { SettingsProvider } from "./context/SettingsContext"

/* 🔁 Animated routes wrapper */
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* 🔓 Public routes */}
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/register"
          element={
            <PageTransition>
              <Register />
            </PageTransition>
          }
        />

        {/* 🔒 Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <PageTransition>
                <HistoryPage />
              </PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  )
}
