import { Transaction } from "../api/transactions"

type Props = {
  transactions: Transaction[]
  selectedDate?: string | null
  onSelectDate?: (date: string | null) => void
}

export default function ExpenseCalendar({
  transactions,
  selectedDate,
  onSelectDate
}: Props) {
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
      expensesByDay[d.getDate()] =
        (expensesByDay[d.getDate()] || 0) + t.amount
    }
  })

  return (
    <div className="card section">
      <h3>Expense Calendar</h3>

      {/* Day labels */}
      <div className="calendar-header">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <div key={d} className="calendar-label">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid">
        {Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }).map(
          (_, i) => (
            <div key={`empty-${i}`} />
          )
        )}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`

          const expense = expensesByDay[day]
          const isSelected = selectedDate === dateStr

          return (
            <div
              key={day}
              className={`calendar-day ${isSelected ? "today" : ""}`}
              onClick={() =>
                onSelectDate?.(isSelected ? null : dateStr)
              }
              style={{ cursor: "pointer" }}
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
