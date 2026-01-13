import { useMemo, useState } from "react"
import {
  Transaction,
  deleteTransaction,
  updateTransaction
} from "../api/transactions"
import EditTransactionModal from "./EditTransactionModal"
import { EXPENSE_CATEGORIES } from "../constants/categories"

export default function TransactionTable({
  transactions,
  onReload
}: {
  transactions: Transaction[]
  onReload: () => void
}) {
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)

  const [typeFilter, setTypeFilter] = useState<
    "all" | "income" | "expense"
  >("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

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

  // 1️⃣ FILTER + SORT BY DATE (NEWEST FIRST)
  const filteredSorted = useMemo(() => {
    return [...transactions]
      .filter(t => {
        if (typeFilter !== "all" && t.type !== typeFilter)
          return false
        if (
          categoryFilter !== "all" &&
          t.category !== categoryFilter
        )
          return false
        return true
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
  }, [transactions, typeFilter, categoryFilter])

  // 2️⃣ GROUP BY DATE
  const groupedByDate = useMemo(() => {
    const groups: Record<string, Transaction[]> = {}

    filteredSorted.forEach(t => {
      if (!groups[t.date]) groups[t.date] = []
      groups[t.date].push(t)
    })

    return groups
  }, [filteredSorted])

  return (
    <>
      {/* 🔍 FILTERS */}
      <div className="button-group" style={{ marginBottom: 16 }}>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {EXPENSE_CATEGORIES.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

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
          {Object.entries(groupedByDate).map(
            ([date, txs]) => {
              const dayTotal = txs.reduce(
                (sum, t) =>
                  t.type === "expense"
                    ? sum + t.amount
                    : sum,
                0
              )

              return (
                <fragment key={date}>
                  {/* 📅 DATE HEADER ROW */}
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        fontWeight: 600,
                        background:
                          "rgba(99,102,241,0.08)",
                        paddingTop: 16
                      }}
                    >
                      📅{" "}
                      {new Date(date).toLocaleDateString(
                        undefined,
                        {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }
                      )}
                      {dayTotal > 0 && (
                        <span
                          style={{
                            marginLeft: 12,
                            color: "var(--expense)",
                            fontSize: 13
                          }}
                        >
                          (₹{dayTotal} spent)
                        </span>
                      )}
                    </td>
                  </tr>

                  {/* TRANSACTIONS */}
                  {txs.map(t => (
                    <tr key={t.id}>
                      <td>{t.date}</td>

                      <td>
                        <span
                          className={`category-badge ${t.category}`}
                        >
                          {t.category}
                        </span>
                      </td>

                      <td
                        className={
                          t.type === "income"
                            ? "income"
                            : "expense"
                        }
                        style={{ fontWeight: 600 }}
                      >
                        {t.type.toUpperCase()}
                      </td>

                      <td>₹{t.amount}</td>
                      <td>{t.note}</td>

                      <td
                        style={{
                          display: "flex",
                          gap: 8
                        }}
                      >
                        <button
                          className="secondary"
                          onClick={() =>
                            setEditing(t)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="secondary"
                          disabled={
                            loadingId === t.id
                          }
                          onClick={() =>
                            handleDelete(t.id)
                          }
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </fragment>
              )
            }
          )}
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
