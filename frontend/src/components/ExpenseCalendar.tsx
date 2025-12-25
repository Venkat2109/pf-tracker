import { Transaction } from "../api/transactions"

type Props = {
  transactions: Transaction[]
}

export default function ExpenseCalendar({ transactions }: Props) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const expensesByDay: Record<number, number> = {}

  transactions.forEach(t => {
    if (t.type !== "expense") return
    const d = new Date(t.date)
    if (d.getMonth() === month && d.getFullYear() === year) {
      const day = d.getDate()
      expensesByDay[day] = (expensesByDay[day] || 0) + t.amount
    }
  })

  return (
    <div className="card">
      <h3>Expense Calendar</h3>

      <div className="calendar-grid calendar-header">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <div key={d} className="calendar-label">
            {d}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map(
          (_, i) => (
            <div key={`empty-${i}`} />
          )
        )}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const isToday = day === today.getDate()
          const expense = expensesByDay[day]

          return (
            <div
              key={day}
              className={`calendar-day ${isToday ? "today" : ""}`}
            >
              <span className="calendar-date">{day}</span>

              {expense && (
                <span className="calendar-expense">
                  ₹{expense}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
