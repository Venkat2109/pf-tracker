import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SettingsProvider } from "./context/SettingsContext"
import Dashboard from "./pages/Dashboard"
import HistoryPage from "./pages/HistoryPage"

export default function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}
