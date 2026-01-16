// src/components/PageLayout.tsx
import { ReactNode } from "react"

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
        </main>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  )
}
