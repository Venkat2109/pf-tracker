// src/utils/mascotBrain.ts
import { Transaction } from "../api/transactions"

export type MascotMood = "happy" | "warning" | "neutral"

export type MascotContext = {
  transactions: Transaction[]
  income?: number
  expense?: number
  balance?: number
}

/* =========================
   SHARED HELPERS
========================= */

const idleMessages = [
  "I'm watching your expenses quietly 👀",
  "Tap me anytime for insights 🤖",
  "Your money story is unfolding 📊",
  "Budgets love consistency 💙",
  "Small habits build big savings 🌱"
]

function getTopExpenseCategory(transactions: Transaction[]) {
  const map: Record<string, number> = {}

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])[0]?.[0]
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning ☀️"
  if (h < 18) return "Good afternoon 🌤️"
  return "Good evening 🌙"
}

/* =========================
   DASHBOARD — SINGLE MESSAGE
========================= */

export function getMascotMessage(
  ctx: MascotContext
): { text: string; mood: MascotMood } {
  const { transactions, income = 0, expense = 0, balance = 0 } = ctx

  if (transactions.length === 0) {
    return {
      text: "Add your first transaction ✨",
      mood: "happy"
    }
  }

  if (expense > income) {
    return {
      text: "You're spending more than earning ⚠️",
      mood: "warning"
    }
  }

  if (balance < income * 0.2) {
    return {
      text: "Balance is running low 👀",
      mood: "warning"
    }
  }

  const top = getTopExpenseCategory(transactions)
  if (top) {
    return {
      text: `Most spending is on ${top}. Awareness helps 👁️`,
      mood: "neutral"
    }
  }

  return {
    text: `${getGreeting()} — ${
      idleMessages[Math.floor(Math.random() * idleMessages.length)]
    }`,
    mood: "neutral"
  }
}

/* =========================
   HISTORY — SINGLE MESSAGE
========================= */

export function getHistoryMascotMessage(
  transactions: Transaction[]
): { text: string; mood: MascotMood } {
  if (transactions.length === 0) {
    return {
      text: "Your history will grow as you track more ✨",
      mood: "neutral"
    }
  }

  const top = getTopExpenseCategory(transactions)

  if (top) {
    return {
      text: `Historically, you spend the most on ${top} 💸`,
      mood: "neutral"
    }
  }

  return {
    text: "Your past spending looks balanced 👍",
    mood: "happy"
  }
}

/* =========================
   SMART ROTATING MESSAGES
========================= */

export function getMascotMessages(
  ctx: MascotContext
): { text: string; mood: MascotMood }[] {
  const messages: { text: string; mood: MascotMood }[] = []

  // Always include primary insight first
  messages.push(getMascotMessage(ctx))

  if (ctx.expense! > ctx.income!) {
    messages.push({
      text: "Try setting a soft spending limit this month 🎯",
      mood: "warning"
    })
  }

  const topCategory = getTopExpenseCategory(ctx.transactions)
  if (topCategory) {
    messages.push({
      text: `Tip: Review your ${topCategory} spending weekly 📅`,
      mood: "neutral"
    })
  }

  // Idle / ambient messages
  idleMessages.forEach(m =>
    messages.push({ text: m, mood: "neutral" })
  )

  return messages
}
