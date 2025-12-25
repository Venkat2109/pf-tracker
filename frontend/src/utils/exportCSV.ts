import { Transaction } from "../api/transactions"

export function exportToCSV(transactions: Transaction[]) {
  const headers = ["Date", "Type", "Amount", "Note"]

  const rows = transactions.map(t =>
    [t.date, t.type, t.amount, t.note ?? ""].join(",")
  )

  const csvContent = [headers.join(","), ...rows].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "pf-tracker.csv"
  a.click()

  URL.revokeObjectURL(url)
}
