import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import {
  getTransactions,
  createTransaction,
  Transaction
} from "../api/transactions"

import TransactionForm from "../components/TransactionForm"
import TransactionTable from "../components/TransactionTable"
import SummaryChart from "../components/SummaryChart"
import ExpenseChart from "../components/ExpenseChart"
import ExpenseHeatmap from "../components/ExpenseHeatmap"
import Header from "../components/Header"
import DashboardControls from "../components/DashboardControl"
import Insights from "../components/Insights"
import Loading from "../components/Loading"
import ShortcutHelp from "../components/ShortcutHelp"
import Mascot from "../components/Mascot"

import { exportToCSV } from "../utils/exportCSV"
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showHelp, setShowHelp] = useState(false)
  const addRef = useRef<HTMLDivElement>(null)

  async function loadTransactions() {
    setLoading(true)
    const data = await getTransactions()
    setTransactions(data)
    setLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  function prevMonth() {
    setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1))
  }

  function nextMonth() {
    setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1))
  }

  const filteredTransactions = transactions.filter(t => {
    const d = new Date(t.date)
    return (
      d.getMonth() === currentMonth.getMonth() &&
      d.getFullYear() === currentMonth.getFullYear()
    )
  })

  const income = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  // 🏷️ TOP SPENDING CATEGORIES
  const topCategories = Object.entries(
    filteredTransactions
      .filter(t => t.type === "expense")
      .reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  async function handleAdd(tx: {
    amount: number
    type: "income" | "expense"
    category: string
    note?: string
    date: string
  }) {
    await createTransaction(tx)
    await loadTransactions()
  }

  useKeyboardShortcuts({
    onPrevMonth: prevMonth,
    onNextMonth: nextMonth,
    onResetMonth: () => setCurrentMonth(new Date()),
    onExportCSV: () => exportToCSV(filteredTransactions),
    onFocusAdd: () =>
      addRef.current?.scrollIntoView({ behavior: "smooth" }),
    onToggleHelp: () => setShowHelp(v => !v)
  })

  return (
    <div className="container">
      <Header />

      <DashboardControls
        month={currentMonth}
        onPrev={prevMonth}
        onNext={nextMonth}
      />

      {/* SUMMARY */}
      <motion.div
        className="stats"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {[
          { label: "Income", value: income, className: "income" },
          { label: "Expense", value: expense, className: "expense" },
          { label: "Balance", value: balance, className: "balance" }
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            className={`card ${item.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <p>{item.label}</p>
            <h2>₹{item.value}</h2>
          </motion.div>
        ))}
      </motion.div>

      {/* ADD TRANSACTION */}
      <div ref={addRef}>
        <motion.div
          className="card section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Add Transaction</h2>
          <TransactionForm onAdd={handleAdd} />
        </motion.div>
      </div>

      {/* TOP CATEGORIES */}
      {topCategories.length > 0 && (
        <motion.div
          className="card section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Top Spending Categories</h2>

          <div className="button-group">
            {topCategories.map(([cat, amt]) => (
              <span
                key={cat}
                className={`category-badge ${cat}`}
              >
                {cat} — ₹{amt}
              </span>
            ))}
          </div>
        </motion.div>
      )}

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

      <div className="section">
        <ExpenseHeatmap
          transactions={filteredTransactions}
          month={currentMonth}
        />
      </div>

      <Insights transactions={filteredTransactions} />

      {/* TABLE */}
      <motion.div
        className="card section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2>
          Transactions –{" "}
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}
        </h2>

        {loading ? (
          <Loading message="Fetching transactions..." />
        ) : filteredTransactions.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            No transactions this month 👇
          </p>
        ) : (
          <TransactionTable
            transactions={filteredTransactions}
            onReload={loadTransactions}
          />
        )}
      </motion.div>

      {showHelp && (
        <ShortcutHelp onClose={() => setShowHelp(false)} />
      )}

      <Mascot
        transactions={filteredTransactions}
        income={income}
        expense={expense}
        balance={balance}
      />
    </div>
  )
}
