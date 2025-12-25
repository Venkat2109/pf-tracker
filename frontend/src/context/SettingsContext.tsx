import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface SettingsContextType {
  theme: Theme
  toggleTheme: () => void
  reduceMotion: boolean
  toggleReduceMotion: () => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // 🌙 DARK MODE DEFAULT
  const [theme, setTheme] = useState<Theme>("dark")
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedReduceMotion = localStorage.getItem("reduceMotion")

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme("dark") // force dark first time
    }

    if (savedReduceMotion) setReduceMotion(savedReduceMotion === "true")
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("reduceMotion", String(reduceMotion))
  }, [reduceMotion])

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme(prev => (prev === "light" ? "dark" : "light")),
        reduceMotion,
        toggleReduceMotion: () => setReduceMotion(p => !p)
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider")
  return ctx
}
