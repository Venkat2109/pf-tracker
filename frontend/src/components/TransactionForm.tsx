import { useState } from "react"
import { motion } from "framer-motion"
import {
  EXPENSE_CATEGORIES,
  ExpenseCategory
} from "../constants/categories"

interface Props {
  onAdd: (data: {
    amount: number
    type: "income" | "expense"
    category: ExpenseCategory
    note?: string
    date: string
  }) => Promise<void>
}

export default function TransactionForm({ onAdd }: Props) {
  const today = new Date().toISOString().split("T")[0]

  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [category, setCategory] =
    useState<ExpenseCategory>("Others")
  const [note, setNote] = useState("")
  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amount) return

    setLoading(true)
    try {
      await onAdd({
        amount: Number(amount),
        type,
        category: type === "expense" ? category : "Others",
        note,
        date
      })
      setAmount("")
      setNote("")
      setCategory("Others")
      setType("expense")
      setDate(today)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="transaction-form"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      <select
        value={type}
        onChange={e => setType(e.target.value as any)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {type === "expense" && (
        <motion.select
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          value={category}
          onChange={e =>
            setCategory(e.target.value as ExpenseCategory)
          }
        >
          {EXPENSE_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </motion.select>
      )}

      <input
        type="date"
        value={date}
        max={today}
        onChange={e => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Saving..." : "Save"}
      </motion.button>
    </motion.form>
  )
}
