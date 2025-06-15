import React, { useState, useEffect } from "react";

function BudgetOverview({ 
  expenses = [], 
  totalIncome = 0, 
  handleEditBudget, 
  transactions = [],
  budget = 0,
  timeLimit = "monthly"
}) {
  // Calculate monthly savings (income - expenses for current month)
  const monthlyExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const monthlySavings = totalIncome - monthlyExpenses;

  // Calculate total savings (all income - all expenses)
  const allIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const allExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.amount || 0), 0);
  
  const totalSavings = allIncome - allExpenses;

  const remainingBudget = budget - monthlyExpenses;
  const [categories, setCategories] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState([]);

  useEffect(() => {
    if (!Array.isArray(expenses)) return;
    
    const categoryMap = expenses.reduce((acc, expense) => {
      const category = expense.category?.trim().toLowerCase() || 'uncategorized';
      const amount = Number(expense.amount) || 0;
      
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      
      return acc;
    }, {});

    const sortedCategories = Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .map(([category, total]) => ({
        category,
        total
      }));

    setCategories(sortedCategories.map(item => item.category));
    setCategoryTotals(sortedCategories.map(item => item.total));
  }, [expenses]);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Your {timeLimit} Budget Overview</h2>

      {/* Budget Progress Bar */}
      <div className="row justify-content-center m-5">
        <div className="col-md-8 mb-3">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center">Budget Usage</h5>
              <div className="progress" style={{ height: "20px" }}>
                <div 
                  className={`progress-bar ${monthlyExpenses / budget > 0.8 ? "bg-danger" : "bg-success"}`}
                  role="progressbar"
                  style={{
                    width: budget > 0 ? `${Math.min((monthlyExpenses / budget) * 100, 100)}%` : "0%",
                  }}
                >
                  {budget > 0 ? `${Math.min(((monthlyExpenses / budget) * 100).toFixed(1), 100)}%` : '0%'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Monthly Income</h5>
              <p className="fs-4 fw-bold text-success">₹{totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Monthly Savings</h5>
              <p className={`fs-4 fw-bold ${monthlySavings < 0 ? "text-danger" : "text-success"}`}>
                ₹{monthlySavings.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Monthly Expenses</h5>
              <p className="fs-4 fw-bold text-danger">₹{monthlyExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Monthly Budget</h5>
              <p className="fs-4 fw-bold text-primary">₹{budget.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h5 className="card-title">Remaining Budget</h5>
              <p className={`fs-4 fw-bold ${remainingBudget < 0 ? "text-danger" : "text-primary"}`}>
                ₹{remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>


      </div>

      {/* Expense Categories */}
      <div className="row">
        <h1 className="text-center m-4 text-dark">Expense Categories</h1>
        <div className="col-md-7">
          <div className="list-group">
            {categories.map((cat, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <span className="fw-bold text-uppercase">{cat}</span>
                <span className="fs-4 text-danger">
                  ₹{categoryTotals[index]?.toLocaleString() || '0'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-5 d-none d-md-block">
          <img
            src="media/images/budget.jpg"
            alt="Budget"
            className="img-fluid w-100"
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-warning" onClick={handleEditBudget}>
          Edit Budget
        </button>
      </div>
    </div>
  );
}

export default BudgetOverview;