import { ReactNode } from "react"
import Footer from "./Footer"

export default function PageLayout({
  children,
  variant = "app"
}: {
  children: ReactNode
  variant?: "app" | "auth"
}) {
  return (
    <div className="app-grid">
      {variant === "app" ? (
        <main className="app-content">
          {children}
          <Footer />
        </main>
      ) : (
        children
      )}
    </div>
  )
}
