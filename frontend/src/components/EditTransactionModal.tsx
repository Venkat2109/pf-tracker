import { useState } from "react"
import { Transaction } from "../api/transactions"

export default function EditTransactionModal({
  transaction,
  onClose,
  onSave
}: {
  transaction: Transaction
  onClose: () => void
  onSave: (t: Transaction) => void
}) {
  const [amount, setAmount] = useState(transaction.amount)
  const [note, setNote] = useState(transaction.note || "")

  return (
    <div className="modal">
      <div className="card">
        <h3>Edit Transaction</h3>

        <input
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />

        <input
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={() =>
              onSave({ ...transaction, amount, note })
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
