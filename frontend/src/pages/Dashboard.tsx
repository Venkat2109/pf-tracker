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
import Mascot from "../components/Mascot"   // ✅ NEW

import { exportToCSV } from "../utils/exportCSV"
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  // 📅 Month navigation
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // ⌨️ Shortcut help modal
  const [showHelp, setShowHelp] = useState(false)

  // 🎯 Focus add transaction
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

  // ⬅️➡️ Month navigation
  function prevMonth() {
    setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() - 1))
  }

  function nextMonth() {
    setCurrentMonth(d => new Date(d.getFullYear(), d.getMonth() + 1))
  }

  // 📌 Filter transactions by selected month
  const filteredTransactions = transactions.filter(t => {
    const d = new Date(t.date)
    return (
      d.getMonth() === currentMonth.getMonth() &&
      d.getFullYear() === currentMonth.getFullYear()
    )
  })

  // 💰 Calculations
  const income = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)

  const expense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income - expense

  // ➕ ADD TRANSACTION
  async function handleAdd(tx: {
    amount: number
    type: "income" | "expense"
    note?: string
    date: string
  }) {
    await createTransaction(tx)
    await loadTransactions()
  }

  // ⌨️ KEYBOARD SHORTCUTS
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
      {/* HEADER */}
      <Header />

      {/* MONTH NAVIGATION */}
      <DashboardControls
        month={currentMonth}
        onPrev={prevMonth}
        onNext={nextMonth}
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

      {/* ADD TRANSACTION */}
      <div ref={addRef}>
        <motion.div
          className="card section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Add Transaction</h2>
          <TransactionForm onAdd={handleAdd} />
        </motion.div>
      </div>

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

      {/* 🔥 EXPENSE HEATMAP */}
      <div className="section">
        <ExpenseHeatmap
          transactions={filteredTransactions}
          month={currentMonth}
        />
      </div>

      {/* 🧠 INSIGHTS */}
      <Insights transactions={filteredTransactions} />

      {/* ✅ TRANSACTIONS TABLE */}
      <motion.div
        className="card section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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

      {/* ⌨️ SHORTCUT HELP */}
      {showHelp && (
        <ShortcutHelp onClose={() => setShowHelp(false)} />
      )}

      {/* 🤖 MASCOT (FLOATING, GLOBAL) */}
      <Mascot
        transactions={filteredTransactions}
        income={income}
        expense={expense}
        balance={balance}
      />
    </div>
  )
}
