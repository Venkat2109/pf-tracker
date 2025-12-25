import { useState } from "react"
import { Transaction } from "../api/transactions"
import EditTransactionModal from "./EditTransactionModal"

export default function TransactionTable({
  transactions,
  onUpdate
}: {
  transactions: Transaction[]
  onUpdate: (tx: Transaction[]) => void
}) {
  const [editing, setEditing] = useState<Transaction | null>(null)

  function deleteTx(id: number) {
    if (!confirm("Delete this transaction?")) return
    onUpdate(transactions.filter(t => t.id !== id))
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
            <th />
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.type}</td>
              <td>₹{t.amount}</td>
              <td>{t.note}</td>
              <td>
                <button onClick={() => setEditing(t)}>✏️</button>
                <button onClick={() => deleteTx(t.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditTransactionModal
          transaction={editing}
          onClose={() => setEditing(null)}
          onSave={updated =>
            onUpdate(
              transactions.map(t =>
                t.id === updated.id ? updated : t
              )
            )
          }
        />
      )}
    </>
  )
}
