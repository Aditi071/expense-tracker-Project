import config from '../config';

import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    amount: '',
    category: '',
    type: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("You must be logged in to view transactions.");
        return;
      }

      const response = await fetch(`${config.apiBaseUrl}/transactions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("token");
        } else {
          setError("Failed to load transactions. Please try again later.");
        }
        return;
      }

      const data = await response.json();
      const sortedTransactions = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required");
        return false;
      }

      if (!editForm.title || !editForm.amount || !editForm.category) {
        toast.error("Please fill all required fields");
        return false;
      }

      const response = await fetch(`${config.apiBaseUrl}/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        await fetchTransactions();
        toast.success("Transaction updated successfully!");
        setEditingId(null);
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

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
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

  return (
    <div className="container my-5">
      <h3>All Transactions</h3>
      <ToastContainer position="top-right" autoClose={3000} />

      {isLoading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="card shadow-sm border-0 p-3 mb-4"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            {editingId === transaction._id ? (
              <div className="edit-form">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    required
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    required
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditSubmit(transaction._id)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between">
                  <div>
                    <h5>{transaction.title}</h5>
                    <p>{new Date(transaction.date).toLocaleDateString()}</p>
                    <small className="text-muted">{transaction.category}</small>
                  </div>
                  <div>
                    {transaction.type === "income" ? (
                      <FaArrowUp color="green" size={24} />
                    ) : (
                      <FaArrowDown color="red" size={24} />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="btn-group">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditClick(transaction)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                  <h4 className={transaction.type === "income" ? "text-success" : "text-danger"}>
                    ₹{transaction.amount}
                  </h4>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
}

export default AllTransactions;