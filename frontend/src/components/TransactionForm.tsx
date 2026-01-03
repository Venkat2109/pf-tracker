import { useState } from "react"

interface Props {
  onAdd: (data: {
    amount: number
    type: "income" | "expense"
    note?: string
    date: string
  }) => Promise<void>
}

export default function TransactionForm({ onAdd }: Props) {
  const today = new Date().toISOString().split("T")[0]

  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [note, setNote] = useState("")
  const [date, setDate] = useState(today)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amount) return

    setLoading(true)

    await onAdd({
      amount: Number(amount),
      type,
      note,
      date
    })

    setAmount("")
    setNote("")
    setType("expense")
    setDate(today)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      />

      {/* Type */}
      <select
        value={type}
        onChange={e => setType(e.target.value as "income" | "expense")}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* Date (PAST ALLOWED, FUTURE BLOCKED) */}
      <input
        type="date"
        value={date}
        max={today}
        onChange={e => setDate(e.target.value)}
        required
      />

      {/* Note */}
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
