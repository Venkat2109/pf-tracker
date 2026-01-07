import { Transaction } from "../api/transactions"

type MascotContext = {
  transactions: Transaction[]
  income: number
  expense: number
  balance: number
}

const idleMessages = [
  "I'm keeping an eye on your money 👀",
  "Your wallet and I are friends 🤖",
  "Money moves, I observe 📊",
  "Tap me if you want insights!"
]

export function getMascotMessage({
  transactions,
  income,
  expense,
  balance
}: MascotContext): string {
  // 🌱 First-time user
  if (transactions.length === 0) {
    return "Start by adding your first transaction ✨"
  }

  // 💰 No expenses yet
  if (expense === 0) {
    return "No expenses yet — impressive control 😎"
  }

  // ⚠️ Overspending
  if (expense > income) {
    return "Careful! Expenses are higher than income ⚠️"
  }

  // 💸 Low balance warning
  if (balance < income * 0.2) {
    return "Your balance is running low 👀"
  }

  // 📅 Many transactions today
  const today = new Date().toISOString().split("T")[0]
  const todayTx = transactions.filter(t => t.date === today)

  if (todayTx.length >= 5) {
    return "Busy day! Lots of transactions today 📆"
  }

  // 🧘 Default idle
  return idleMessages[Math.floor(Math.random() * idleMessages.length)]
}
