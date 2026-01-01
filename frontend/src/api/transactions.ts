export interface Transaction {
  id: number
  amount: number
  type: "income" | "expense"
  date: string
  note?: string
}

const API_BASE = "http://localhost:8000/api/v1/transactions"

/* 🔐 Helper to attach JWT */
function authHeaders() {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/* 📥 GET ALL TRANSACTIONS */
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_BASE, {
    headers: {
      ...authHeaders()
    }
  })

  if (!res.ok) throw new Error("Failed to fetch transactions")
  return res.json()
}

/* ➕ CREATE TRANSACTION */
export async function createTransaction(data: {
  amount: number
  type: "income" | "expense"
  note?: string
}): Promise<Transaction> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders()
    },
    body: JSON.stringify({
      account_id: 1,
      category_id: 1,
      amount: data.amount,
      type: data.type,
      date: new Date().toISOString().split("T")[0],
      note: data.note
    })
  })

  if (!res.ok) throw new Error("Failed to create transaction")
  return res.json()
}

/* ✏️ UPDATE TRANSACTION */
export async function updateTransaction(
  id: number,
  data: {
    amount: number
    type: "income" | "expense"
    note?: string
    date: string
  }
): Promise<Transaction> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders()
    },
    body: JSON.stringify(data)
  })

  if (!res.ok) throw new Error("Failed to update transaction")
  return res.json()
}

/* 🗑 DELETE TRANSACTION */
export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      ...authHeaders()
    }
  })

  if (!res.ok) throw new Error("Failed to delete transaction")
}
