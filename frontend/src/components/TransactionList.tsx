import { useEffect, useState } from "react";
import { fetchTransactions, Transaction } from "../api/transactions";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions()
      .then(setTransactions)
      .catch(() => setError("Could not load transactions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table style={{ width: "100%", marginTop: "1rem" }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.date}</td>
            <td
              style={{
                color: tx.type === "income" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {tx.type.toUpperCase()}
            </td>
            <td>{tx.amount}</td>
            <td>{tx.note || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
