import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"
import { motion } from "framer-motion"
import { Transaction } from "../api/transactions"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function SummaryChart({
  transactions
}: {
  transactions: Transaction[]
}) {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0)

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0)

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#16a34a", "#dc2626"],
        borderRadius: 8,
        barThickness: 60
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <h2 style={{ marginBottom: 16 }}>Income vs Expense</h2>
      <Bar data={data} options={options} />
    </motion.div>
  )
}
