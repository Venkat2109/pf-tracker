import { motion } from "framer-motion"
import { Transaction } from "../api/transactions"
import { generateInsights } from "../utils/insightsEngine"

export default function Insights({
  transactions
}: {
  transactions: Transaction[]
}) {
  const insights = generateInsights(transactions)

  return (
    <motion.div
      className="card section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>Smart Insights 🧠</h2>

      <ul style={{ marginTop: 16, paddingLeft: 20 }}>
        {insights.map((insight, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            style={{ marginBottom: 12, lineHeight: 1.6 }}
          >
            {insight}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
