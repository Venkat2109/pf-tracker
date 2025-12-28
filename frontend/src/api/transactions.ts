// frontend/src/api/transactions.ts

export interface Transaction {
  id: number
  amount: number
  type: "income" | "expense"
  date: string
  note?: string
}

const API_BASE = "http://localhost:8000/api/v1/transactions"

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_BASE)
  if (!res.ok) {
    throw new Error("Failed to fetch transactions")
  }
  return res.json()
}

export async function createTransaction(data: {
  amount: number
  type: "income" | "expense"
  note?: string
}): Promise<Transaction> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      account_id: 1,
      category_id: 1,
      amount: data.amount,
      type: data.type,
      date: new Date().toISOString().split("T")[0],
      note: data.note
    })
  })

  if (!res.ok) {
    throw new Error("Failed to create transaction")
  }

  return res.json()
}

/* ✅ NEW: Update transaction */
export async function updateTransaction(
  id: number,
  data: {
    amount: number
    type: "income" | "expense"
    note?: string
  }
): Promise<Transaction> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (!res.ok) {
    throw new Error("Failed to update transaction")
  }

  return res.json()
}

/* ✅ NEW: Delete transaction */
export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE"
  })

  if (!res.ok) {
    throw new Error("Failed to delete transaction")
  }
}
