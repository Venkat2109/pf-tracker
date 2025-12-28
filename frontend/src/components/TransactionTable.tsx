import { useState } from "react"
import {
  Transaction,
  deleteTransaction,
  updateTransaction
} from "../api/transactions"
import EditTransactionModal from "./EditTransactionModal"

export default function TransactionTable({
  transactions,
  onUpdate
}: {
  transactions: Transaction[]
  onUpdate: (tx: Transaction[]) => void
}) {
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  async function deleteTx(id: number) {
    if (!confirm("Delete this transaction?")) return

    try {
      setLoadingId(id)
      await deleteTransaction(id)
      onUpdate(transactions.filter(t => t.id !== id))
    } finally {
      setLoadingId(null)
    }
  }

  async function saveTx(updated: Transaction) {
    const saved = await updateTransaction(updated.id, {
      amount: updated.amount,
      type: updated.type,
      note: updated.note
    })

    onUpdate(
      transactions.map(t =>
        t.id === saved.id ? saved : t
      )
    )
    setEditing(null)
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th style={{ width: 120 }} />
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>

              <td
                className={t.type === "income" ? "income" : "expense"}
                style={{ fontWeight: 600 }}
              >
                {t.type}
              </td>

              <td>₹{t.amount}</td>
              <td>{t.note}</td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end"
                  }}
                >
                  <button
                    className="secondary"
                    onClick={() => setEditing(t)}
                    title="Edit"
                  >
                    ✏️
                  </button>

                  <button
                    className="secondary"
                    onClick={() => deleteTx(t.id)}
                    disabled={loadingId === t.id}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditTransactionModal
          transaction={editing}
          onClose={() => setEditing(null)}
          onSave={saveTx}
        />
      )}
    </>
  )
}
