import config from '../config';

import React, { useEffect, useState } from "react";
import Header from "./Header";
import RecentTransactions from "./RecentTransactions";
import Charts from "./Charts";
import Expense from "./Expenses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      toast.error("Authentication required");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${config.apiBaseUrl}/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions");
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        return;
      }
      
      const response = await fetch(`${config.apiBaseUrl}/transactions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchTransactions();
        toast.success("Transaction deleted successfully!");
      } else {
        throw new Error("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error(error.message || "Error deleting transaction");
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        return false;
      }
      
      if (!updatedData.title || !updatedData.amount || !updatedData.category) {
        toast.error("Please fill all required fields");
        return false;
      }

      const response = await fetch(`${config.apiBaseUrl}/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        await fetchTransactions();
        toast.success("Transaction updated successfully!");
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update transaction");
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error(error.message || "Error updating transaction");
      return false;
    }
  };

  const calculateTotalsByPeriod = (transactions, period = 'month') => {
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

    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= periodStart;
    });

    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    return { income, expenses };
  };

  // Calculate totals for different time periods
  const { income: dailyIncome, expenses: dailyExpenses } = calculateTotalsByPeriod(transactions, 'day');
  const { income: weeklyIncome, expenses: weeklyExpenses } = calculateTotalsByPeriod(transactions, 'week');
  const { income: monthlyIncome, expenses: monthlyExpenses } = calculateTotalsByPeriod(transactions, 'month');

  const addTransaction = async (newTransaction) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      if (!newTransaction.title || !newTransaction.amount || !newTransaction.type) {
        toast.error("Please fill all required fields");
        return;
      }

      const response = await fetch(
        `${config.apiBaseUrl}/transactions/add`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            title: newTransaction.title,
            amount: parseFloat(newTransaction.amount),
            type: newTransaction.type,
            date: newTransaction.date || new Date().toISOString(),
            category: newTransaction.category || "Miscellaneous",
          }),
        }
      );

      if (response.ok) {
        await fetchTransactions();
        // toast.success("Transaction added successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error(error.message || "Error adding transaction");
    }
  };

  return (
    <>
      <Header transactions={transactions} />
      <Expense addTransaction={addTransaction} />
      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <RecentTransactions 
            transactions={transactions} 
            onDelete={deleteTransaction}
            onUpdate={updateTransaction}
          />
          <Charts
            dailyIncome={dailyIncome}
            dailyExpenses={dailyExpenses}
            weeklyIncome={weeklyIncome}
            weeklyExpenses={weeklyExpenses}
            monthlyIncome={monthlyIncome}
            monthlyExpenses={monthlyExpenses}
            transactions={transactions}
          />
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default DashboardPage;