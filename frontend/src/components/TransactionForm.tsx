import { useState } from "react"
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
        category,
        note,
        date
      })

      setAmount("")
      setNote("")
      setCategory("Others")
      setType("expense")
      setDate(today)
    } catch (err: any) {
      alert(err?.message || "Failed to save transaction")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
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
        <select
          value={category}
          onChange={e =>
            setCategory(e.target.value as ExpenseCategory)
          }
        >
          {EXPENSE_CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
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

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
