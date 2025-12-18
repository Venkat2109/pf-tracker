const API_URL = "http://localhost:8000/api/v1/transactions";

export type Transaction = {
  id: number;
  amount: number;
  type: "income" | "expense";
  note?: string;
  date: string;
};

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return res.json();
}

export async function createTransaction(data: {
  amount: number;
  type: "income" | "expense";
  note?: string;
  date: string;
}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create transaction");
  }

  return res.json();
}
