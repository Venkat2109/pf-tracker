import { useState } from "react"
import {
  Transaction,
  deleteTransaction,
  updateTransaction
} from "../api/transactions"
import EditTransactionModal from "./EditTransactionModal"

export default function TransactionTable({
  transactions,
  onReload
}: {
  transactions: Transaction[]
  onReload: () => void
}) {
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  async function handleDelete(id: number) {
    if (!confirm("Delete this transaction?")) return

    try {
      setLoadingId(id)
      await deleteTransaction(id)
      onReload()
    } finally {
      setLoadingId(null)
    }
  }

  async function handleSave(updated: Transaction) {
    await updateTransaction(updated.id, {
      amount: updated.amount,
      type: updated.type,
      category: updated.category,
      date: updated.date,
      note: updated.note
    })

    setEditing(null)
    onReload()
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.category || "Others"}</td>

              <td
                className={t.type === "income" ? "income" : "expense"}
                style={{ fontWeight: 600 }}
              >
                {t.type.toUpperCase()}
              </td>

              <td>₹{t.amount}</td>
              <td>{t.note}</td>

              <td style={{ display: "flex", gap: 8 }}>
                <button
                  className="secondary"
                  onClick={() => setEditing(t)}
                >
                  ✏️
                </button>

                <button
                  className="secondary"
                  disabled={loadingId === t.id}
                  onClick={() => handleDelete(t.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditTransactionModal
          transaction={editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </>
  )
}
