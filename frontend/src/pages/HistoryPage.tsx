import { useEffect, useMemo, useState } from "react"
import { getTransactions, Transaction } from "../api/transactions"
import Header from "../components/Header"
import Mascot from "../components/Mascot"
import PageLayout from "../components/PageLayout"
import { motion } from "framer-motion"

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  // 🆕 View toggle
  const [view, setView] = useState<"date" | "category">("date")

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .finally(() => setLoading(false))
  }, [])

  /**
   * 🧠 Group transactions by date (DESC) — EXISTING LOGIC (UNCHANGED)
   */
  const groupedByDate = useMemo(() => {
    const map: Record<string, Transaction[]> = {}

    transactions.forEach(tx => {
      if (!map[tx.date]) map[tx.date] = []
      map[tx.date].push(tx)
    })

    return Object.entries(map)
      .sort(
        (a, b) =>
          new Date(b[0]).getTime() -
          new Date(a[0]).getTime()
      )
      .map(([date, txs]) => {
        const total = txs
          .filter(t => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0)

        return { date, transactions: txs, total }
      })
  }, [transactions])

  /**
   * 🆕 Group expenses by category
   */
  const groupedByCategory = useMemo(() => {
    const map: Record<string, Transaction[]> = {}

    transactions
      .filter(t => t.type === "expense")
      .forEach(tx => {
        if (!map[tx.category]) map[tx.category] = []
        map[tx.category].push(tx)
      })

    return Object.entries(map)
      .map(([category, txs]) => {
        const total = txs.reduce(
          (sum, t) => sum + t.amount,
          0
        )

        return { category, transactions: txs, total }
      })
      .sort((a, b) => b.total - a.total)
  }, [transactions])

  return (
    <PageLayout>
      <Header />

      <h2>History & Patterns 📅</h2>
      <p className="label">
        Review how your spending evolved over time
      </p>

      {/* 🔀 VIEW TOGGLE */}
      <div className="button-group" style={{ marginTop: 12 }}>
        <button
          className={view === "date" ? "" : "secondary"}
          onClick={() => setView("date")}
        >
          By Date
        </button>

        <button
          className={view === "category" ? "" : "secondary"}
          onClick={() => setView("category")}
        >
          By Category
        </button>
      </div>

      {/* ⏳ LOADING / EMPTY */}
      {loading ? (
        <p style={{ marginTop: 32 }}>Loading history…</p>
      ) : transactions.length === 0 ? (
        <p style={{ marginTop: 32, color: "var(--muted)" }}>
          No transactions yet. Your history will appear here.
        </p>
      ) : (
        <div className="section">
          {/* =========================
              📅 BY DATE VIEW (ORIGINAL)
          ========================= */}
          {view === "date" &&
            groupedByDate.map(({ date, transactions, total }) => (
              <motion.div
                key={date}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: 24 }}
              >
                {/* DATE HEADER */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 12
                  }}
                >
                  <strong>{date}</strong>

                  {total > 0 && (
                    <span
                      style={{
                        color: "var(--expense)",
                        fontWeight: 600
                      }}
                    >
                      ₹{total} spent
                    </span>
                  )}
                </div>

                {/* TRANSACTIONS */}
                <ul style={{ paddingLeft: 18 }}>
                  {transactions.map(tx => (
                    <li
                      key={tx.id}
                      style={{
                        marginBottom: 8,
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>
                        <strong>{tx.category}</strong>
                        {tx.note && (
                          <span
                            style={{
                              color: "var(--muted)",
                              marginLeft: 6
                            }}
                          >
                            — {tx.note}
                          </span>
                        )}
                      </span>

                      <span
                        style={{
                          color:
                            tx.type === "income"
                              ? "var(--income)"
                              : "var(--expense)",
                          fontWeight: 600
                        }}
                      >
                        {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

          {/* =========================
              🏷️ BY CATEGORY VIEW (NEW)
          ========================= */}
          {view === "category" &&
            groupedByCategory.map(
              ({ category, transactions, total }) => (
                <motion.div
                  key={category}
                  className="card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: 24 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12
                    }}
                  >
                    <strong>{category}</strong>
                    <span
                      style={{
                        color: "var(--expense)",
                        fontWeight: 600
                      }}
                    >
                      ₹{total} total
                    </span>
                  </div>

                  <ul style={{ paddingLeft: 18 }}>
                    {transactions.map(tx => (
                      <li
                        key={tx.id}
                        style={{
                          marginBottom: 6,
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        <span style={{ color: "var(--muted)" }}>
                          {tx.date}
                          {tx.note && ` — ${tx.note}`}
                        </span>

                        <span
                          style={{
                            color: "var(--expense)",
                            fontWeight: 600
                          }}
                        >
                          ₹{tx.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            )}
        </div>
      )}

      {/* 🤖 HISTORY MASCOT INSIGHTS */}
      <Mascot transactions={transactions} mode="history" />
    </PageLayout>
  )
}
