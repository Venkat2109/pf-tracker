// src/utils/mascotBrain.ts
import { Transaction } from "../api/transactions"

type MascotMood = "happy" | "warning" | "neutral"

type MascotContext = {
  transactions: Transaction[]
  income?: number
  expense?: number
  balance?: number
}

/* =========================
   DASHBOARD LOGIC (UNCHANGED)
========================= */

const idleMessages = [
  "I'm watching your expenses quietly 👀",
  "Tap me anytime for insights 🤖",
  "Your money story is unfolding 📊",
  "Budgets love consistency 💙"
]

function getTopExpenseCategory(transactions: Transaction[]) {
  const map: Record<string, number> = {}
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })

  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0]
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Good morning ☀️"
  if (h < 18) return "Good afternoon 🌤️"
  return "Good evening 🌙"
}

export function getMascotMessage(ctx: MascotContext) {
  const { transactions, income = 0, expense = 0, balance = 0 } = ctx

  if (transactions.length === 0) {
    return { text: "Add your first transaction ✨", mood: "happy" }
  }

  if (expense > income) {
    return { text: "You're spending more than earning ⚠️", mood: "warning" }
  }

  if (balance < income * 0.2) {
    return { text: "Balance is running low 👀", mood: "warning" }
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
   HISTORY-SPECIFIC LOGIC 🧠
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

  const expenses = transactions.filter(t => t.type === "expense")
  const byCategory: Record<string, number> = {}

  expenses.forEach(t => {
    byCategory[t.category] = (byCategory[t.category] || 0) + t.amount
  })

  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]

  if (top) {
    return {
      text: `Historically, you spend the most on ${top[0]} 💸`,
      mood: "neutral"
    }
  }

  return {
    text: "Your past spending looks balanced 👍",
    mood: "happy"
  }
}
