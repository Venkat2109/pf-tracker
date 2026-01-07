export interface Transaction {
  id: number
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  note?: string
}

const API_BASE = "http://localhost:8000/api/v1/transactions"

function authHeaders() {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_BASE, {
    headers: authHeaders()
  })

  if (res.status === 401 || res.status === 403) {
    throw new Error("UNAUTHORIZED")
  }

  if (!res.ok) {
    throw new Error("Failed to fetch transactions")
  }

  return res.json()
}

export async function createTransaction(data: {
  amount: number
  type: "income" | "expense"
  category: string
  date: string
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
      category: data.category,
      date: data.date,
      note: data.note
    })
  })

  if (res.status === 401 || res.status === 403) {
    throw new Error("UNAUTHORIZED")
  }

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || "Failed to create transaction")
  }

  return res.json()
}

export async function updateTransaction(
  id: number,
  data: {
    amount: number
    type: "income" | "expense"
    category: string
    date: string
    note?: string
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

  if (res.status === 401 || res.status === 403) {
    throw new Error("UNAUTHORIZED")
  }

  if (!res.ok) {
    throw new Error("Failed to update transaction")
  }

  return res.json()
}

export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  })

  if (res.status === 401 || res.status === 403) {
    throw new Error("UNAUTHORIZED")
  }

  if (!res.ok) {
    throw new Error("Failed to delete transaction")
  }
}
