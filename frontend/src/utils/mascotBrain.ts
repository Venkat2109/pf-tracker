// src/utils/mascotBrain.ts
import { Transaction } from "../api/transactions"

type MascotContext = {
  transactions: Transaction[]
  income: number
  expense: number
  balance: number
}

type MascotMood = "happy" | "warning" | "neutral"

const idleMessages = [
  "I'm watching your expenses quietly 👀",
  "Tap me anytime for insights 🤖",
  "Your money story is unfolding 📊",
  "Budgets love consistency 💙"
]

function getTopExpenseCategory(
  transactions: Transaction[]
): string | null {
  const map: Record<string, number> = {}

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      const cat = t.category || "Others"
      map[cat] = (map[cat] || 0) + t.amount
    })

  const entries = Object.entries(map)
  if (entries.length === 0) return null

  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning ☀️"
  if (hour < 18) return "Good afternoon 🌤️"
  return "Good evening 🌙"
}

export function getMascotMessage(
  ctx: MascotContext
): { text: string; mood: MascotMood } {
  const { transactions, income, expense, balance } = ctx

  // 🌱 First-time user
  if (transactions.length === 0) {
    return {
      text: "Let's start tracking! Add your first transaction ✨",
      mood: "happy"
    }
  }

  // 🧾 Busy day
  const today = new Date().toISOString().split("T")[0]
  const todayCount = transactions.filter(t => t.date === today).length
  if (todayCount >= 5) {
    return {
      text: "Busy money day! Lots of activity today 📆",
      mood: "neutral"
    }
  }

  // ⚠️ Overspending
  if (expense > income) {
    return {
      text: "Careful! You're spending more than you earn ⚠️",
      mood: "warning"
    }
  }

  // 💸 Low balance
  if (balance < income * 0.2) {
    return {
      text: "Your balance is getting low 👀 Might want to slow down.",
      mood: "warning"
    }
  }

  // 🧠 Category insight
  const topCategory = getTopExpenseCategory(transactions)
  if (topCategory && topCategory !== "Savings") {
    return {
      text: `Most of your spending is on ${topCategory}. Keeping an eye helps 👁️`,
      mood: "neutral"
    }
  }

  // 😊 Healthy finances
  if (balance > income * 0.4) {
    return {
      text: "Nice balance! You're managing money well 😄",
      mood: "happy"
    }
  }

  // 🧘 Idle
  return {
    text: `${getGreeting()} — ${
      idleMessages[Math.floor(Math.random() * idleMessages.length)]
    }`,
    mood: "neutral"
  }
}
