import { Transaction } from "../api/transactions";

type Props = {
  transactions: Transaction[];
};

export default function SummaryCards({ transactions }: Props) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
      <Card title="Income" value={income} color="green" />
      <Card title="Expense" value={expense} color="red" />
      <Card title="Balance" value={balance} color="blue" />
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: 8,
      }}
    >
      <h3>{title}</h3>
      <p style={{ color, fontSize: "1.5rem", fontWeight: "bold" }}>
        ₹{value}
      </p>
    </div>
  );
}
