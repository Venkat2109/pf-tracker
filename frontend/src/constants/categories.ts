export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Education",
  "Entertainment",
  "Health",
  "Shopping",
  "Travel",
  "Utilities",
  "Savings",
  "Others"
] as const

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]
