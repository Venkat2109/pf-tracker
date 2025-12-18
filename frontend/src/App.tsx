import TransactionForm from "./components/TransactionForm";

function App() {
  return (
    <div className="app-container">
      <h1>PF Tracker</h1>

      {/* Summary */}
      <div className="summary-grid">
        <div className="card">
          <p className="label">Income</p>
          <h2 className="income">₹3000</h2>
        </div>

        <div className="card">
          <p className="label">Expense</p>
          <h2 className="expense">₹1000</h2>
        </div>

        <div className="card">
          <p className="label">Balance</p>
          <h2 className="balance">₹2000</h2>
        </div>
      </div>

      {/* Add Transaction */}
      <div className="card form-card">
        <h2>Add Transaction</h2>
        <TransactionForm />
      </div>

      {/* Transactions Table */}
      <div className="card">
        <h2>Transactions</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-12-18</td>
              <td className="expense">EXPENSE</td>
              <td>1000</td>
              <td>Fees</td>
            </tr>
            <tr>
              <td>2025-12-18</td>
              <td className="income">INCOME</td>
              <td>3000</td>
              <td>Pocket Money</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
