import { useEffect, useState } from "react"
import { getTransactions, Transaction } from "../api/transactions"
import TransactionTable from "../components/TransactionTable"
import ExpenseCalendar from "../components/ExpenseCalendar"
import Header from "../components/Header"

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  return (
    <div className="container">
      <Header />

      <h2>Transaction History</h2>

      <ExpenseCalendar transactions={transactions} />

      <TransactionTable
        transactions={transactions}
        onUpdate={setTransactions}
      />
    </div>
  )
}
