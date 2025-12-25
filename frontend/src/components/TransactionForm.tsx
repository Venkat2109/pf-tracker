import { useState } from "react"

interface Props {
  onAdd: (data: {
    amount: number
    type: "income" | "expense"
    note?: string
  }) => Promise<void>
}

export default function TransactionForm({ onAdd }: Props) {
  const [amount, setAmount] = useState("")
  const [type, setType] = useState<"income" | "expense">("expense")
  const [note, setNote] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amount) return

    setLoading(true)
    await onAdd({
      amount: Number(amount),
      type,
      note
    })

    setAmount("")
    setNote("")
    setType("expense")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select value={type} onChange={(e) => setType(e.target.value as any)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  )
}
