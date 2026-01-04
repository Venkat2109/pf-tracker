export interface Transaction {
  id: number
  amount: number
  type: "income" | "expense"
  date: string
  note?: string
}

const API_BASE = "http://localhost:8000/api/v1/transactions"

/* 🔐 Attach JWT */
function authHeaders() {
  const token = localStorage.getItem("token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/* 🚨 Handle auth failure globally */
async function handleAuthError(res: Response) {
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token")
    window.location.href = "/login"
    throw new Error("Session expired. Please login again.")
  }
}

/* 📥 GET ALL */
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_BASE, {
    headers: authHeaders()
  })

  await handleAuthError(res)

  if (!res.ok) throw new Error("Failed to fetch transactions")
  return res.json()
}

/* ➕ CREATE (past-date supported) */
export async function createTransaction(data: {
  amount: number
  type: "income" | "expense"
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
      date: data.date,
      note: data.note
    })
  })

  await handleAuthError(res)

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || "Failed to create transaction")
  }

  return res.json()
}

/* ✏️ UPDATE */
export async function updateTransaction(
  id: number,
  data: {
    amount: number
    type: "income" | "expense"
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

  await handleAuthError(res)

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || "Failed to update transaction")
  }

  return res.json()
}

/* 🗑 DELETE */
export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  })

  await handleAuthError(res)

  if (res.status === 401) {
  throw new Error("Unauthorized")
  }
  if (!res.ok) {
  throw new Error("Failed to fetch transactions")
  }

}
