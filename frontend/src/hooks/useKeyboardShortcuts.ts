import { useEffect, useRef } from "react"

type Handlers = {
  onPrevMonth: () => void
  onNextMonth: () => void
  onResetMonth: () => void
  onExportCSV: () => void
  onCloseModal: () => void
  onFocusAdd: () => void
  onToggleHelp: () => void
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    target.isContentEditable
  )
}

export function useKeyboardShortcuts(handlers: Handlers) {
  const sequenceRef = useRef<string | null>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // 🔒 Ignore typing
      if (isTypingTarget(e.target)) return

      // ⛔ Stop browser FIRST
      e.preventDefault()
      e.stopPropagation()

      /* ===== Month Navigation ===== */
      if (e.shiftKey && e.key === "ArrowLeft") {
        handlers.onPrevMonth()
        return
      }

      if (e.shiftKey && e.key === "ArrowRight") {
        handlers.onNextMonth()
        return
      }

      if (e.shiftKey && e.key.toLowerCase() === "m") {
        handlers.onResetMonth()
        return
      }

      /* ===== Actions ===== */
      if (e.key.toLowerCase() === "n") {
        handlers.onFocusAdd()
        return
      }

      if (e.shiftKey && e.key.toLowerCase() === "e") {
        handlers.onExportCSV()
        return
      }

      if (e.key === "Escape") {
        handlers.onCloseModal()
        return
      }

      if (e.shiftKey && e.key === "?") {
        handlers.onToggleHelp()
        return
      }

      /* ===== Two-key navigation ===== */
      if (sequenceRef.current === "g") {
        if (e.key.toLowerCase() === "d") {
          window.location.href = "/"
        }
        if (e.key.toLowerCase() === "h") {
          window.location.href = "/history"
        }
        sequenceRef.current = null
        return
      }

      if (e.key.toLowerCase() === "g") {
        sequenceRef.current = "g"
        setTimeout(() => (sequenceRef.current = null), 800)
      }
    }

    // 🔥 CAPTURE PHASE — browser cannot override
    window.addEventListener("keydown", handleKeyDown, true)

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true)
    }
  }, [handlers])
}
