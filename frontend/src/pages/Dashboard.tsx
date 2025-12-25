import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  getTransactions,
  createTransaction,
  Transaction
} from "../api/transactions"

import TransactionForm from "../components/TransactionForm"
import SummaryChart from "../components/SummaryChart"
import ExpenseChart from "../components/ExpenseChart"
import Header from "../components/Header"
import DashboardControls from "../components/DashboardControl"
import Insights from "../components/Insights"
import Loading from "../components/Loading"

import { exportToCSV } from "../utils/exportCSV"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  // Month / Year toggle
  const [view, setView] = useState<"month" | "year">("month")

  // Editing state
  const [editing, setEditing] = useState<Transaction | null>(null)

  async function loadTransactions() {
    setLoading(true)
    const data = await getTransactions()
    setTransactions(data)
    setLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  // Filter transactions by month/year
  const filteredTransactions = transactions.filter(t => {
    if (view === "year") return true
    const txMonth = new Date(t.date).getMonth()
    const currentMonth = new Date().getMonth()
    return txMonth === currentMonth
  })

  const income = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  async function handleAddOrEdit(tx: Omit<Transaction, "id" | "date">) {
    await createTransaction(tx)
    setEditing(null)
    await loadTransactions()
  }

  function handleDelete(id: number) {
    if (!confirm("Delete this transaction?")) return
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      {/* HEADER */}
      <Header />

      {/* DASHBOARD CONTROLS */}
      <DashboardControls
        view={view}
        onChangeView={setView}
        onExportCSV={() => exportToCSV(filteredTransactions)}
      />

      {/* SUMMARY CARDS */}
      <motion.div
        className="stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {[
          { label: "Income", value: income, className: "income" },
          { label: "Expense", value: expense, className: "expense" },
          { label: "Balance", value: balance, className: "balance" }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className={`card ${item.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
          >
            <p>{item.label}</p>
            <h2>₹{item.value}</h2>
          </motion.div>
        ))}
      </motion.div>

      {/* ADD / EDIT TRANSACTION */}
      <motion.div
        className="card section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2>{editing ? "Edit Transaction" : "Add Transaction"}</h2>
        <TransactionForm
          onAdd={handleAddOrEdit}
          initialData={editing ?? undefined}
        />
      </motion.div>

      {/* CHARTS */}
      <div
        className="section"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32
        }}
      >
        <SummaryChart transactions={filteredTransactions} />
        <ExpenseChart transactions={filteredTransactions} />
      </div>

      {/* INSIGHTS */}
      <Insights transactions={filteredTransactions} />

      {/* TRANSACTIONS TABLE */}
      <motion.div
        className="card section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2>
          Transactions ({view === "month" ? "This Month" : "This Year"})
        </h2>

        {loading ? (
          <Loading message="Fetching transactions..." />
        ) : filteredTransactions.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            No transactions yet. Add your first one 👇
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td className={t.type}>{t.type.toUpperCase()}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.note}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setEditing(t)}>✏️</button>
                    <button onClick={() => handleDelete(t.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  )
}
