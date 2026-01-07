import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { motion } from "framer-motion"
import { Transaction } from "../api/transactions"

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  transactions: Transaction[]
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#ef4444",
  Transport: "#f97316",
  Housing: "#3b82f6",
  Education: "#8b5cf6",
  Entertainment: "#22c55e",
  Health: "#06b6d4",
  Shopping: "#ec4899",
  Travel: "#14b8a6",
  Utilities: "#eab308",
  Savings: "#22c55e",
  Others: "#9ca3af"
}

export default function ExpenseChart({ transactions }: Props) {
  const expenses = transactions.filter(t => t.type === "expense")
  const categoryTotals: Record<string, number> = {}

  expenses.forEach(t => {
    const category = t.category || "Others"
    categoryTotals[category] =
      (categoryTotals[category] || 0) + t.amount
  })

  const labels = Object.keys(categoryTotals)
  const values = Object.values(categoryTotals)

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map(
          l => CATEGORY_COLORS[l] || "#9ca3af"
        ),
        borderWidth: 0
      }
    ]
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2 style={{ marginBottom: 16 }}>Expense Breakdown</h2>

      {values.length === 0 ? (
        <p style={{ color: "#6b7280" }}>
          No expenses yet. Add one to see insights 📊
        </p>
      ) : (
        <Pie data={data} />
      )}
    </motion.div>
  )
}
