import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

import {
  getTransactions,
  createTransaction,
  Transaction
} from "../api/transactions"

import TransactionForm from "../components/TransactionForm"
import SummaryChart from "../components/SummaryChart"
import ExpenseChart from "../components/ExpenseChart"
import ExpenseHeatmap from "../components/ExpenseHeatmap"
import Header from "../components/Header"
import DashboardControls from "../components/DashboardControl"
import Insights from "../components/Insights"
import Loading from "../components/Loading"

function isTyping() {
  const el = document.activeElement
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el?.getAttribute("contenteditable") === "true"
  )
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [editing, setEditing] = useState<Transaction | null>(null)

  // For "G then D / H" navigation
  const lastKeyRef = useRef<string | null>(null)

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
    setCurrentMonth(
      d => new Date(d.getFullYear(), d.getMonth() - 1)
    )
  }

  function nextMonth() {
    setCurrentMonth(
      d => new Date(d.getFullYear(), d.getMonth() + 1)
    )
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
    .reduce((s, t) => s + t.amount, 0)

  const expense = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0)

  const balance = income - expense

  async function handleAddOrEdit(
    tx: Omit<Transaction, "id" | "date">
  ) {
    await createTransaction(tx)
    setEditing(null)
    await loadTransactions()
  }

  /* ============================
     ⌨️ KEYBOARD SHORTCUTS (SAFE)
     ============================ */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (isTyping()) return

      // Shift + Arrow navigation
      if (e.shiftKey && e.key === "ArrowLeft") {
        e.preventDefault()
        prevMonth()
        return
      }

      if (e.shiftKey && e.key === "ArrowRight") {
        e.preventDefault()
        nextMonth()
        return
      }

      // Add new transaction
      if (e.key.toLowerCase() === "n") {
        e.preventDefault()
        setEditing(null)
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      // Export CSV (Shift + E)
      if (e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault()
        alert("CSV export shortcut triggered (hook it here)")
        return
      }

      // GitHub-style navigation: G then D / H
      if (lastKeyRef.current === "g") {
        if (e.key.toLowerCase() === "d") {
          window.location.href = "/"
        }
        if (e.key.toLowerCase() === "h") {
          window.location.href = "/history"
        }
        lastKeyRef.current = null
        return
      }

      if (e.key.toLowerCase() === "g") {
        lastKeyRef.current = "g"
        setTimeout(() => (lastKeyRef.current = null), 800)
        return
      }

      // Help overlay
      if (e.key === "?") {
        alert(
          `Keyboard Shortcuts:
N – Add transaction
Shift + ← / → – Change month
G then D – Dashboard
G then H – History
Shift + E – Export CSV`
        )
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <div className="container">
      <Header />

      <DashboardControls
        month={currentMonth}
        onPrev={prevMonth}
        onNext={nextMonth}
      />

      <motion.div className="stats">
        {[
          { label: "Income", value: income, className: "income" },
          { label: "Expense", value: expense, className: "expense" },
          { label: "Balance", value: balance, className: "balance" }
        ].map(item => (
          <div key={item.label} className={`card ${item.className}`}>
            <p>{item.label}</p>
            <h2>₹{item.value}</h2>
          </div>
        ))}
      </motion.div>

      <div className="card section">
        <h2>{editing ? "Edit Transaction" : "Add Transaction"}</h2>
        <TransactionForm
          onAdd={handleAddOrEdit}
          initialData={editing ?? undefined}
        />
      </div>

      <div className="section" style={{ display: "grid", gap: 32 }}>
        <SummaryChart transactions={filteredTransactions} />
        <ExpenseChart transactions={filteredTransactions} />
      </div>

      <ExpenseHeatmap
        transactions={filteredTransactions}
        month={currentMonth}
      />

      <Insights transactions={filteredTransactions} />

      <div className="card section">
        <h2>
          Transactions –{" "}
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}
        </h2>

        {loading ? (
          <Loading message="Fetching transactions..." />
        ) : (
          <table>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.note}</td>
                  <td>
                    <button
                      className="secondary"
                      onClick={() => setEditing(t)}
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
