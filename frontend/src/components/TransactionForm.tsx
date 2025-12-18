import { useState } from "react";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) return;

    // Your existing API logic stays here
    console.log({ amount, type, note });

    setAmount("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default TransactionForm;
