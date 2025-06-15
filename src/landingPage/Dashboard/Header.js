import React from "react";

function Header({ transactions }) {
  const calculateTotalsByPeriod = (period = 'month') => {
    const now = new Date();
    let periodStart;

    if (period === 'day') {
      periodStart = new Date(now.setHours(0, 0, 0, 0));
    } else if (period === 'week') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      periodStart = new Date(now.setDate(diff));
      periodStart.setHours(0, 0, 0, 0);
    } else { // month
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const filteredTransactions = transactions.filter(t => 
      new Date(t.date) >= periodStart
    );

    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    return { income, expenses };
  };

  const { income: monthlyIncome, expenses: monthlyExpenses } = calculateTotalsByPeriod('month');
  const monthlyBalance = monthlyIncome - monthlyExpenses;

  return (
    <div className="container my-5 text-center">
      <h1>Dashboard</h1>
      <h4>Welcome, Aditi!</h4>
      <div className="row text-center mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow" style={{ backgroundColor: "#f0f0f0" }}>
            <h5>Monthly Balance</h5>
            <h3>₹{monthlyBalance}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow" style={{ backgroundColor: "#d4f7d4" }}>
            <h5>Monthly Income</h5>
            <h3>₹{monthlyIncome}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow" style={{ backgroundColor: "#f7d4d4" }}>
            <h5>Monthly Expenses</h5>
            <h3>₹{monthlyExpenses}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;