import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface SettingsContextType {
  theme: Theme
  toggleTheme: () => void
  reduceMotion: boolean
  toggleReduceMotion: () => void

  /** 🆕 Mascot toggle */
  showMascot: boolean
  toggleMascot: () => void
}

const SettingsContext = createContext<SettingsContextType | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [reduceMotion, setReduceMotion] = useState(false)
  const [showMascot, setShowMascot] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedReduceMotion = localStorage.getItem("reduceMotion")
    const savedMascot = localStorage.getItem("showMascot")

    if (savedTheme) setTheme(savedTheme)
    if (savedReduceMotion) setReduceMotion(savedReduceMotion === "true")
    if (savedMascot) setShowMascot(savedMascot === "true")
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem("reduceMotion", String(reduceMotion))
  }, [reduceMotion])

  useEffect(() => {
    localStorage.setItem("showMascot", String(showMascot))
  }, [showMascot])

  return (
    <SettingsContext.Provider
      value={{
        theme,
        toggleTheme: () =>
          setTheme(prev => (prev === "light" ? "dark" : "light")),
        reduceMotion,
        toggleReduceMotion: () => setReduceMotion(p => !p),

        showMascot,
        toggleMascot: () => setShowMascot(p => !p)
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
