import { Transaction } from "../api/transactions"

type MascotContext = {
  transactions: Transaction[]
  income: number
  expense: number
  balance: number
}

export function getMascotMessage(ctx: MascotContext): string {
  const { transactions, income, expense, balance } = ctx

  if (transactions.length === 0) {
    return "🤖 Let's start tracking! Add your first transaction."
  }

  const today = new Date().toISOString().split("T")[0]
  const hasToday = transactions.some(t => t.date === today)

  if (!hasToday) {
    return "🤖 No entries today. Still tracking mentally? 👀"
  }

  if (expense > income) {
    return "⚠️ Expenses are higher than income this month. Stay alert!"
  }

  if (balance > 0 && income > 0) {
    return "✅ Nice! You're maintaining a positive balance 💰"
  }

  return "🤖 I'm watching your finances. You're doing okay!"
}
