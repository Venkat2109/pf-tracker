import { useEffect, useState } from "react"
import { getTransactions, Transaction } from "../api/transactions"
import TransactionTable from "../components/TransactionTable"
import ExpenseCalendar from "../components/ExpenseCalendar"
import Header from "../components/Header"

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  const filteredTransactions = selectedDate
    ? transactions.filter(t => t.date === selectedDate)
    : transactions

  return (
    <div className="container">
      <Header />

      <h2>Transaction History</h2>

      <ExpenseCalendar
        transactions={transactions}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className="section" />

      <TransactionTable
        transactions={filteredTransactions}
        onUpdate={setTransactions}
      />
    </div>
  )
}
