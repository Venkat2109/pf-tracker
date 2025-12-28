import { Transaction } from "../api/transactions"

type Props = {
  transactions: Transaction[]
  month: Date
}

function getIntensity(amount: number) {
  if (amount === 0) return "transparent"
  if (amount < 200) return "rgba(239,68,68,0.25)"
  if (amount < 500) return "rgba(239,68,68,0.45)"
  if (amount < 1000) return "rgba(239,68,68,0.65)"
  return "rgba(239,68,68,0.9)"
}

export default function ExpenseHeatmap({ transactions, month }: Props) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()

  // Group expenses per day
  const dailyTotals: Record<number, number> = {}

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      const d = new Date(t.date)
      const day = d.getDate()
      dailyTotals[day] = (dailyTotals[day] || 0) + t.amount
    })

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstDay = new Date(year, monthIndex, 1).getDay()

  return (
    <div className="card">
      <h3>Expense Heatmap</h3>

      <div className="calendar-grid">
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const amount = dailyTotals[day] || 0

          return (
            <div
              key={day}
              className="calendar-day"
              title={`₹${amount}`}
              style={{
                background: getIntensity(amount)
              }}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
