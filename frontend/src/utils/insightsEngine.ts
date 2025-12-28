import { Transaction } from "../api/transactions"
import { categorize } from "./category"

export function generateInsights(transactions: Transaction[]) {
  if (transactions.length === 0) {
    return ["Start adding transactions to see insights 📊"]
  }

  const insights: string[] = []

  const expenses = transactions.filter(t => t.type === "expense")
  const income = transactions.filter(t => t.type === "income")

  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0)
  const totalIncome = income.reduce((s, t) => s + t.amount, 0)

  // 1️⃣ Spending vs income
  if (totalExpense > totalIncome) {
    insights.push(
      "⚠️ You spent more than you earned. Consider reducing discretionary expenses."
    )
  } else {
    insights.push(
      "✅ Your expenses are under control. Good financial discipline!"
    )
  }

  // 2️⃣ Category dominance (FIXED)
  const categoryTotals: Record<string, number> = {}

  expenses.forEach(t => {
    const cat = categorize(t.note)
    categoryTotals[cat] = (categoryTotals[cat] || 0) + t.amount
  })

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0]

  if (topCategory) {
    insights.push(
      `🍔 Most of your spending goes towards <strong>${topCategory[0]}</strong>. This might be an area to optimize.`
    )
  }

  // 3️⃣ High-frequency spending
  if (expenses.length >= 10) {
    insights.push(
      "🔁 You have frequent expenses. Small daily spends can add up quickly."
    )
  }

  // 4️⃣ Weekend pattern
  const weekendSpends = expenses.filter(t => {
    const day = new Date(t.date).getDay()
    return day === 0 || day === 6
  })

  if (weekendSpends.length > expenses.length * 0.4) {
    insights.push(
      "🎉 You tend to spend more on weekends. Planning weekend budgets could help."
    )
  }

  // 5️⃣ Positive reinforcement
  if (totalExpense < totalIncome * 0.7) {
    insights.push(
      "👏 Excellent saving habit! You're keeping expenses well below income."
    )
  }

  return insights
}
